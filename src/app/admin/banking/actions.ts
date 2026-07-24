"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { syncConnection } from "./sync";
import { reconcileAccount } from "./reconcile";
import { starlingEnabled, getStarlingAccounts, getStarlingBalance } from "@/lib/starling";
import { paypalEnabled } from "@/lib/paypal";
import { parseStatement } from "@/lib/statement-parse";

function canWrite(role?: string) {
  return role === "owner" || role === "bookkeeper";
}

// Reconcile: rules + invoice matching, then an AI second pass on anything no
// rule caught (when a Claude key is configured).
export async function runReconcile(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const accountId = String(formData.get("account_id"));
  await reconcileAccount(accountId, 400).catch((e) => console.error("Reconcile failed:", e));
  revalidatePath(`/admin/banking/${accountId}`);
  revalidatePath("/admin/banking");
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

// Provision a PayPal connection + account, then sync.
export async function connectPaypal(): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  if (!paypalEnabled()) redirect("/admin/banking");
  const supabase = await getSupabaseServer();

  let connId: string;
  const { data: existing } = await supabase.from("fm_bank_connections").select("id").eq("provider", "paypal").limit(1).maybeSingle();
  if (existing) {
    connId = existing.id;
  } else {
    const { data: conn } = await supabase
      .from("fm_bank_connections")
      .insert({ provider: "paypal", institution_name: "PayPal", status: "linked", linked_at: new Date().toISOString(), created_by: profile.id })
      .select("id")
      .single();
    if (!conn) redirect("/admin/banking?error=paypal");
    connId = conn.id;
  }

  await supabase.from("fm_bank_accounts").upsert(
    { connection_id: connId, external_account_id: "paypal-main", name: "PayPal", currency: "GBP" },
    { onConflict: "external_account_id", ignoreDuplicates: false },
  );

  await syncConnection(connId).catch((e) => console.error("PayPal initial sync failed:", e));
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
  // Credit-card statements list charges as positive; flip so spending is money out.
  const reverse = String(formData.get("statement_type")) === "card";
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
      .insert({ connection_id: connId, external_account_id: `manual-${crypto.randomUUID()}`, name, currency, kind: reverse ? "card" : "bank" })
      .select("id")
      .single();
    if (!acct) redirect("/admin/banking/import?error=parse");
    accountId = acct.id;
  }

  const txnRows = rows.map((r) => {
    const amount = reverse ? -r.amount : r.amount;
    return {
      account_id: accountId,
      external_transaction_id: r.externalId,
      booking_date: r.date,
      amount,
      currency,
      direction: amount >= 0 ? "in" : "out",
      counterparty: r.counterparty,
      description: r.description,
    };
  });
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

// Record an incoming transaction as non-invoiced income (app revenue, interest,
// VAT refund, etc.) so it counts in the P&L without an invoice.
export async function recordIncome(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const txnId = String(formData.get("txn_id"));
  const category = String(formData.get("category") || "Other income").trim();
  const supabase = await getSupabaseServer();

  const { data: txn } = await supabase.from("fm_bank_transactions").select("*").eq("id", txnId).single();
  if (!txn) redirect("/admin/banking");
  const amt = Math.abs(Number(txn.amount));

  const { data: inc } = await supabase
    .from("fm_income")
    .insert({
      source: txn.counterparty,
      category,
      description: txn.description,
      currency: txn.currency,
      net: amt,
      vat: 0,
      gross: amt,
      received_on: txn.booking_date || new Date().toISOString().slice(0, 10),
      created_by: profile.id,
    })
    .select("id")
    .single();

  await supabase
    .from("fm_bank_transactions")
    .update({ reconciled: true, matched_income_id: inc?.id ?? null })
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

export async function addRule(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const supabase = await getSupabaseServer();
  const action = String(formData.get("action") || "expense");
  await supabase.from("fm_bank_rules").insert({
    match_text: String(formData.get("match_text") || "").trim(),
    direction: String(formData.get("direction") || "any"),
    action,
    category: action === "expense" ? String(formData.get("category") || "").trim() || null : null,
    priority: Number(formData.get("priority")) || 100,
    created_by: profile.id,
  });
  revalidatePath("/admin/banking/rules");
}

export async function deleteRule(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const supabase = await getSupabaseServer();
  await supabase.from("fm_bank_rules").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/banking/rules");
}

export async function toggleRule(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || !canWrite(profile.role)) redirect("/admin");
  const supabase = await getSupabaseServer();
  await supabase.from("fm_bank_rules").update({ enabled: formData.get("enabled") === "on" }).eq("id", String(formData.get("id")));
  revalidatePath("/admin/banking/rules");
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

  // Read the current links so we can reverse them cleanly.
  const { data: txn } = await supabase
    .from("fm_bank_transactions")
    .select("account_id, matched_expense_id, matched_payment_id, matched_invoice_id, matched_income_id")
    .eq("id", txnId)
    .single();
  if (!txn) return;

  // Delete the expense or income this reconciliation created.
  if (txn.matched_expense_id) {
    await supabase.from("fm_expenses").delete().eq("id", txn.matched_expense_id);
  }
  if (txn.matched_income_id) {
    await supabase.from("fm_income").delete().eq("id", txn.matched_income_id);
  }
  // Delete the payment and roll the invoice back.
  if (txn.matched_payment_id) {
    await supabase.from("fm_payments").delete().eq("id", txn.matched_payment_id);
    if (txn.matched_invoice_id) {
      const { data: inv } = await supabase.from("fm_invoices").select("total, status").eq("id", txn.matched_invoice_id).single();
      const { data: pays } = await supabase.from("fm_payments").select("amount").eq("invoice_id", txn.matched_invoice_id).eq("status", "succeeded");
      const paid = (pays ?? []).reduce((s, p) => s + Number(p.amount), 0);
      if (inv && inv.status !== "void") {
        const status = paid <= 0 ? "sent" : paid < Number(inv.total) ? "part_paid" : "paid";
        await supabase.from("fm_invoices").update({ amount_paid: paid, status }).eq("id", txn.matched_invoice_id);
      }
    }
  }

  await supabase
    .from("fm_bank_transactions")
    .update({ reconciled: false, auto_reconciled: false, matched_invoice_id: null, matched_expense_id: null, matched_payment_id: null, matched_income_id: null })
    .eq("id", txnId);

  revalidatePath(`/admin/banking/${txn.account_id}`);
}
