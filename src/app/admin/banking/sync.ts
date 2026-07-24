import { getSupabaseServer } from "@/lib/supabase/server";
import { syncTransactions, getAccounts } from "@/lib/plaid";

// Pulls transactions + refreshes balances for one connection (Plaid Item).
// Plaid amounts are positive for money OUT of the account and negative for money
// IN, so we invert to our convention (+ = in, - = out). Only posted (non-pending)
// transactions are stored. Reconciliation state is preserved across re-syncs
// because the upsert never writes the reconciled / matched_* columns.
export async function syncConnection(connectionId: string): Promise<void> {
  const supabase = await getSupabaseServer();

  const { data: conn } = await supabase
    .from("fm_bank_connections")
    .select("id, access_token, sync_cursor")
    .eq("id", connectionId)
    .single();
  if (!conn?.access_token) return;

  const { data: accounts } = await supabase
    .from("fm_bank_accounts")
    .select("id, external_account_id, currency")
    .eq("connection_id", connectionId);
  const byExternal = new Map((accounts ?? []).map((a) => [a.external_account_id, a]));

  const { added, modified, removed, nextCursor } = await syncTransactions(conn.access_token, conn.sync_cursor);

  const rows = [...added, ...modified]
    .filter((t) => !t.pending)
    .map((t) => {
      const acct = byExternal.get(t.account_id);
      if (!acct) return null;
      const amount = -Number(t.amount); // invert Plaid sign
      return {
        account_id: acct.id,
        external_transaction_id: t.transaction_id,
        booking_date: t.date || null,
        amount,
        currency: t.iso_currency_code || t.unofficial_currency_code || acct.currency,
        direction: amount >= 0 ? "in" : "out",
        counterparty: t.merchant_name || t.name || null,
        description: t.name || null,
        raw: t as unknown as Record<string, unknown>,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (rows.length) {
    await supabase.from("fm_bank_transactions").upsert(rows, { onConflict: "account_id,external_transaction_id" });
  }

  // Remove deleted transactions that haven't been reconciled.
  const removedIds = removed.map((r) => r.transaction_id);
  if (removedIds.length) {
    await supabase
      .from("fm_bank_transactions")
      .delete()
      .in("external_transaction_id", removedIds)
      .eq("reconciled", false);
  }

  await supabase.from("fm_bank_connections").update({ sync_cursor: nextCursor }).eq("id", connectionId);

  // Refresh balances.
  try {
    const { accounts: fresh } = await getAccounts(conn.access_token);
    const now = new Date().toISOString();
    for (const a of fresh) {
      await supabase
        .from("fm_bank_accounts")
        .update({ balance: a.balances.current, balance_at: now, last_synced_at: now })
        .eq("external_account_id", a.account_id);
    }
  } catch (e) {
    console.error("Balance refresh failed:", e);
  }
}
