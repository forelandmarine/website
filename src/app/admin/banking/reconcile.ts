import { getSupabaseServer, getCurrentProfile } from "@/lib/supabase/server";
import { categorise, type AiItem } from "@/lib/ai-categorise";

export type AutoResult = { expenses: number; transfers: number; matched: number };

// AI-categorises an account's unreconciled money-out transactions: creates a
// categorised expense (or marks a transfer). Reversible + flagged like any auto
// action. Money-in is left alone (handled by invoice matching / manual review).
export async function aiCategoriseAccount(accountId: string): Promise<{ expenses: number; transfers: number; skipped: number }> {
  const supabase = await getSupabaseServer();
  const profile = await getCurrentProfile();

  const { data: txns } = await supabase
    .from("fm_bank_transactions")
    .select("id, counterparty, description, amount, direction, currency, booking_date")
    .eq("account_id", accountId)
    .eq("reconciled", false)
    .eq("direction", "out")
    .order("booking_date", { ascending: false })
    .limit(120); // bounded per run so it fits the function timeout; click again for more

  const list = txns ?? [];
  if (!list.length) return { expenses: 0, transfers: 0, skipped: 0 };

  const items: AiItem[] = list.map((t, i) => ({
    i,
    text: `${t.counterparty ?? ""} ${t.description ?? ""}`.trim() || "Unknown",
    amount: Number(t.amount),
  }));

  const labels = await categorise(items);

  const result = { expenses: 0, transfers: 0, skipped: 0 };
  for (let i = 0; i < list.length; i++) {
    const label = labels.get(i);
    const t = list[i];
    if (!label || label === "skip") {
      result.skipped++;
      continue;
    }
    if (label === "transfer") {
      await supabase.from("fm_bank_transactions").update({ reconciled: true, auto_reconciled: true }).eq("id", t.id);
      result.transfers++;
      continue;
    }
    const gross = Math.abs(Number(t.amount));
    const { data: exp } = await supabase
      .from("fm_expenses")
      .insert({
        supplier: t.counterparty,
        category: label,
        description: t.description,
        currency: t.currency,
        net: gross,
        vat: 0,
        gross,
        status: "paid",
        spent_on: t.booking_date || new Date().toISOString().slice(0, 10),
        created_by: profile?.id ?? null,
      })
      .select("id")
      .single();
    await supabase
      .from("fm_bank_transactions")
      .update({ reconciled: true, auto_reconciled: true, matched_expense_id: exp?.id ?? null })
      .eq("id", t.id);
    result.expenses++;
  }
  return result;
}

// Applies bank rules + invoice auto-matching to an account's unreconciled
// transactions. Rules: money-out matches create a categorised expense or mark a
// transfer (no P&L). Unmatched money-in is auto-applied to an open invoice only
// when exactly one open invoice's outstanding balance equals the amount. Every
// auto action is flagged auto_reconciled and is reversible via "undo".
export async function autoReconcileAccount(accountId: string): Promise<AutoResult> {
  const supabase = await getSupabaseServer();
  const profile = await getCurrentProfile();

  const [{ data: rules }, { data: txns }, { data: invoices }] = await Promise.all([
    supabase.from("fm_bank_rules").select("*").eq("enabled", true).order("priority"),
    supabase.from("fm_bank_transactions").select("*").eq("account_id", accountId).eq("reconciled", false),
    supabase
      .from("fm_invoices")
      .select("id, client_id, total, amount_paid, currency")
      .in("status", ["sent", "part_paid", "overdue"]),
  ]);

  const openInvoices = (invoices ?? []).map((i) => ({
    ...i,
    outstanding: Number(i.total) - Number(i.amount_paid),
  }));

  const result: AutoResult = { expenses: 0, transfers: 0, matched: 0 };

  for (const t of txns ?? []) {
    const hay = `${t.counterparty ?? ""} ${t.description ?? ""}`.toLowerCase();
    const dir = t.direction as "in" | "out";

    const rule = (rules ?? []).find(
      (r) => (r.direction === "any" || r.direction === dir) && hay.includes(String(r.match_text).toLowerCase()),
    );

    if (rule) {
      if (rule.action === "expense" && dir === "out") {
        const gross = Math.abs(Number(t.amount));
        const { data: exp } = await supabase
          .from("fm_expenses")
          .insert({
            supplier: t.counterparty,
            category: rule.category,
            description: t.description,
            currency: t.currency,
            net: gross,
            vat: 0,
            gross,
            status: "paid",
            spent_on: t.booking_date || new Date().toISOString().slice(0, 10),
            created_by: profile?.id ?? null,
          })
          .select("id")
          .single();
        await supabase
          .from("fm_bank_transactions")
          .update({ reconciled: true, auto_reconciled: true, matched_expense_id: exp?.id ?? null })
          .eq("id", t.id);
        result.expenses++;
      } else {
        // transfer (or an 'expense' rule that hit an incoming txn → treat as transfer)
        await supabase.from("fm_bank_transactions").update({ reconciled: true, auto_reconciled: true }).eq("id", t.id);
        result.transfers++;
      }
      continue;
    }

    // No rule: try to auto-apply incoming money to a unique open invoice.
    if (dir === "in") {
      const amt = Math.round(Number(t.amount) * 100) / 100;
      const candidates = openInvoices.filter(
        (i) => i.currency === t.currency && Math.round(i.outstanding * 100) / 100 === amt && i.outstanding > 0,
      );
      if (candidates.length === 1) {
        const inv = candidates[0];
        const { data: pay } = await supabase
          .from("fm_payments")
          .insert({
            invoice_id: inv.id,
            client_id: inv.client_id,
            type: "other",
            method: "bank",
            currency: inv.currency,
            amount: amt,
            status: "succeeded",
            reference: t.description || "Bank transfer",
            paid_at: (t.booking_date || new Date().toISOString().slice(0, 10)) + "T00:00:00",
          })
          .select("id")
          .single();
        // Roll up invoice.
        const { data: pays } = await supabase.from("fm_payments").select("amount").eq("invoice_id", inv.id).eq("status", "succeeded");
        const paid = (pays ?? []).reduce((s, p) => s + Number(p.amount), 0);
        const status = paid >= Number(inv.total) ? "paid" : paid > 0 ? "part_paid" : "sent";
        await supabase.from("fm_invoices").update({ amount_paid: paid, status }).eq("id", inv.id);
        await supabase
          .from("fm_bank_transactions")
          .update({ reconciled: true, auto_reconciled: true, matched_invoice_id: inv.id, matched_payment_id: pay?.id ?? null })
          .eq("id", t.id);
        inv.outstanding = 0; // prevent a second txn matching the same invoice
        result.matched++;
      }
    }
  }

  return result;
}
