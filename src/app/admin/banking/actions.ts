"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import {
  createRequisition,
  getRequisition,
  getAccountMeta,
  getBalance,
  getTransactions,
  type GcTransaction,
} from "@/lib/gocardless";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forelandmarine.com";

function canWrite(role?: string) {
  return role === "owner" || role === "bookkeeper";
}

// Kick off a bank connection: create a requisition and send the user to their
// bank's consent screen. GoCardless redirects back to /admin/banking/callback.
export async function startConnect(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const institutionId = String(formData.get("institution_id") || "");
  const institutionName = String(formData.get("institution_name") || "");
  if (!institutionId) redirect("/admin/banking/connect?error=1");

  const supabase = await getSupabaseServer();
  const { data: conn } = await supabase
    .from("fm_bank_connections")
    .insert({ institution_id: institutionId, institution_name: institutionName, created_by: profile.id })
    .select("id")
    .single();
  if (!conn) redirect("/admin/banking/connect?error=1");

  let link: string;
  try {
    const req = await createRequisition({
      institutionId,
      redirect: `${SITE_URL}/admin/banking/callback`,
      reference: conn.id,
    });
    await supabase.from("fm_bank_connections").update({ requisition_id: req.id }).eq("id", conn.id);
    link = req.link;
  } catch {
    await supabase.from("fm_bank_connections").update({ status: "error" }).eq("id", conn.id);
    redirect("/admin/banking/connect?error=api");
  }
  redirect(link);
}

// Pull balances + transactions for one stored account.
export async function syncAccount(accountIdOrForm: string | FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const accountRowId =
    typeof accountIdOrForm === "string" ? accountIdOrForm : String(accountIdOrForm.get("account_id") || "");
  const supabase = await getSupabaseServer();
  const { data: acct } = await supabase
    .from("fm_bank_accounts")
    .select("id, gc_account_id, currency")
    .eq("id", accountRowId)
    .single();
  if (!acct) redirect("/admin/banking");

  try {
    const bal = await getBalance(acct.gc_account_id);
    const { booked } = await getTransactions(acct.gc_account_id);

    const rows = booked.map((t: GcTransaction) => {
      const amount = Number(t.transactionAmount.amount);
      const counterparty = amount >= 0 ? t.creditorName || t.debtorName : t.debtorName || t.creditorName;
      return {
        account_id: acct.id,
        gc_transaction_id: t.transactionId || t.internalTransactionId || `${t.bookingDate}-${t.transactionAmount.amount}-${(t.remittanceInformationUnstructured || "").slice(0, 24)}`,
        booking_date: t.bookingDate || null,
        value_date: t.valueDate || null,
        amount,
        currency: t.transactionAmount.currency || acct.currency,
        direction: amount >= 0 ? "in" : "out",
        counterparty: counterparty || null,
        description: t.remittanceInformationUnstructured || t.additionalInformation || null,
        raw: t as unknown as Record<string, unknown>,
      };
    });

    if (rows.length) {
      // ignoreDuplicates preserves reconciliation state on re-sync.
      await supabase.from("fm_bank_transactions").upsert(rows, { onConflict: "account_id,gc_transaction_id", ignoreDuplicates: true });
    }
    await supabase
      .from("fm_bank_accounts")
      .update({
        balance: bal?.amount ?? null,
        balance_at: bal ? new Date().toISOString() : null,
        last_synced_at: new Date().toISOString(),
      })
      .eq("id", acct.id);
  } catch (err) {
    console.error("Bank sync failed:", err);
  }

  revalidatePath("/admin/banking");
  revalidatePath(`/admin/banking/${accountRowId}`);
}

// Apply an incoming transaction to an invoice as a bank payment.
export async function matchInvoice(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const txnId = String(formData.get("txn_id"));
  const invoiceId = String(formData.get("invoice_id"));
  const supabase = await getSupabaseServer();

  const { data: txn } = await supabase.from("fm_bank_transactions").select("*").eq("id", txnId).single();
  const { data: inv } = await supabase.from("fm_invoices").select("id, client_id, total, currency").eq("id", invoiceId).single();
  if (!txn || !inv) redirect(`/admin/banking`);

  const { data: pay } = await supabase
    .from("fm_payments")
    .insert({
      invoice_id: inv.id,
      client_id: inv.client_id,
      type: "other",
      method: "bank",
      currency: inv.currency,
      amount: Math.abs(Number(txn.amount)),
      status: "succeeded",
      reference: txn.description || "Bank transfer",
      paid_at: (txn.booking_date || new Date().toISOString().slice(0, 10)) + "T00:00:00",
    })
    .select("id")
    .single();

  // Roll up the invoice.
  const { data: pays } = await supabase.from("fm_payments").select("amount").eq("invoice_id", inv.id).eq("status", "succeeded");
  const paid = (pays ?? []).reduce((s, p) => s + Number(p.amount), 0);
  const status = paid >= Number(inv.total) ? "paid" : paid > 0 ? "part_paid" : "sent";
  await supabase.from("fm_invoices").update({ amount_paid: paid, status }).eq("id", inv.id);

  await supabase
    .from("fm_bank_transactions")
    .update({ reconciled: true, matched_invoice_id: inv.id, matched_payment_id: pay?.id ?? null })
    .eq("id", txnId);

  revalidatePath(`/admin/banking/${txn.account_id}`);
}

// Turn an outgoing transaction into an expense.
export async function expenseFromTxn(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const txnId = String(formData.get("txn_id"));
  const category = String(formData.get("category") || "").trim() || null;
  const supabase = await getSupabaseServer();

  const { data: txn } = await supabase.from("fm_bank_transactions").select("*").eq("id", txnId).single();
  if (!txn) redirect("/admin/banking");
  const gross = Math.abs(Number(txn.amount));

  const { data: exp } = await supabase
    .from("fm_expenses")
    .insert({
      supplier: txn.counterparty,
      category,
      description: txn.description,
      currency: txn.currency,
      net: gross,
      vat: 0,
      gross,
      status: "paid",
      spent_on: txn.booking_date || new Date().toISOString().slice(0, 10),
      created_by: profile.id,
    })
    .select("id")
    .single();

  await supabase
    .from("fm_bank_transactions")
    .update({ reconciled: true, matched_expense_id: exp?.id ?? null })
    .eq("id", txnId);

  revalidatePath(`/admin/banking/${txn.account_id}`);
}

export async function dismissTxn(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const txnId = String(formData.get("txn_id"));
  const supabase = await getSupabaseServer();
  const { data: txn } = await supabase.from("fm_bank_transactions").update({ reconciled: true }).eq("id", txnId).select("account_id").single();
  if (txn) revalidatePath(`/admin/banking/${txn.account_id}`);
}

export async function unreconcileTxn(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const txnId = String(formData.get("txn_id"));
  const supabase = await getSupabaseServer();
  const { data: txn } = await supabase
    .from("fm_bank_transactions")
    .update({ reconciled: false, matched_invoice_id: null, matched_expense_id: null, matched_payment_id: null })
    .eq("id", txnId)
    .select("account_id")
    .single();
  if (txn) revalidatePath(`/admin/banking/${txn.account_id}`);
}
