"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { syncConnection } from "./sync";
import { starlingEnabled, getStarlingAccounts, getStarlingBalance } from "@/lib/starling";
import { parseStatement } from "@/lib/statement-parse";

function canWrite(role?: string) {
  return role === "owner" || role === "bookkeeper";
}

// Provision a Starling connection from the personal access token, then sync.
export async function connectStarling(): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  if (!starlingEnabled()) redirect("/admin/banking");
  const supabase = await getSupabaseServer();

  let accounts;
  try {
    accounts = await getStarlingAccounts();
  } catch {
    redirect("/admin/banking?error=starling");
  }
  if (!accounts.length) redirect("/admin/banking?error=starling");

  // One connection per Starling token; reuse if it already exists.
  let connId: string;
  const { data: existing } = await supabase.from("fm_bank_connections").select("id").eq("provider", "starling").limit(1).maybeSingle();
  if (existing) {
    connId = existing.id;
  } else {
    const { data: conn } = await supabase
      .from("fm_bank_connections")
      .insert({ provider: "starling", institution_name: "Starling Bank", status: "linked", linked_at: new Date().toISOString(), created_by: profile.id })
      .select("id")
      .single();
    if (!conn) redirect("/admin/banking?error=starling");
    connId = conn.id;
  }

  for (const a of accounts) {
    const bal = await getStarlingBalance(a.accountUid);
    await supabase.from("fm_bank_accounts").upsert(
      {
        connection_id: connId,
        external_account_id: a.accountUid,
        external_category_id: a.defaultCategory,
        name: `Starling ${a.currency}`,
        currency: a.currency,
        balance: bal?.amount ?? null,
        balance_at: bal ? new Date().toISOString() : null,
      },
      { onConflict: "external_account_id", ignoreDuplicates: false },
    );
  }

  await syncConnection(connId).catch((e) => console.error("Starling initial sync failed:", e));
  redirect("/admin/banking?connected=1");
}

// Import a CSV/OFX statement into a manual account.
export async function importStatement(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const supabase = await getSupabaseServer();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) redirect("/admin/banking/import?error=nofile");
  if (file.size > 5_000_000) redirect("/admin/banking/import?error=toobig");

  const text = await file.text();
  const { rows, error } = parseStatement(file.name, text);
  if (error) redirect("/admin/banking/import?error=parse");
  if (!rows.length) redirect("/admin/banking/import?error=empty");

  const currency = String(formData.get("currency") || "GBP");
  let accountId = String(formData.get("account_id") || "");

  if (!accountId) {
    // Create/reuse a manual connection, then a new manual account.
    let connId: string;
    const { data: existing } = await supabase.from("fm_bank_connections").select("id").eq("provider", "manual").limit(1).maybeSingle();
    if (existing) connId = existing.id;
    else {
      const { data: conn } = await supabase
        .from("fm_bank_connections")
        .insert({ provider: "manual", institution_name: "Imported statements", status: "linked", linked_at: new Date().toISOString(), created_by: profile.id })
        .select("id")
        .single();
      if (!conn) redirect("/admin/banking/import?error=parse");
      connId = conn.id;
    }
    const name = String(formData.get("account_name") || "").trim() || "Imported account";
    const { data: acct } = await supabase
      .from("fm_bank_accounts")
      .insert({ connection_id: connId, external_account_id: `manual-${crypto.randomUUID()}`, name, currency })
      .select("id")
      .single();
    if (!acct) redirect("/admin/banking/import?error=parse");
    accountId = acct.id;
  }

  const txnRows = rows.map((r) => ({
    account_id: accountId,
    external_transaction_id: r.externalId,
    booking_date: r.date,
    amount: r.amount,
    currency,
    direction: r.amount >= 0 ? "in" : "out",
    counterparty: r.counterparty,
    description: r.description,
  }));
  // ignoreDuplicates so re-importing an overlapping statement doesn't double up.
  await supabase.from("fm_bank_transactions").upsert(txnRows, { onConflict: "account_id,external_transaction_id", ignoreDuplicates: true });

  revalidatePath(`/admin/banking/${accountId}`);
  redirect(`/admin/banking/${accountId}?imported=${rows.length}`);
}

// Sync the Plaid Item that this account belongs to (pulls all its accounts'
// transactions and refreshes balances).
export async function syncAccount(accountIdOrForm: string | FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const accountRowId =
    typeof accountIdOrForm === "string" ? accountIdOrForm : String(accountIdOrForm.get("account_id") || "");
  const supabase = await getSupabaseServer();
  const { data: acct } = await supabase.from("fm_bank_accounts").select("connection_id").eq("id", accountRowId).single();
  if (acct?.connection_id) {
    try {
      await syncConnection(acct.connection_id);
    } catch (err) {
      console.error("Bank sync failed:", err);
    }
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
