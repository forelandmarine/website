import { getSupabaseServer } from "@/lib/supabase/server";
import { syncTransactions, getAccounts } from "@/lib/plaid";
import { getStarlingFeed, getStarlingBalance } from "@/lib/starling";
import { getPaypalTransactions } from "@/lib/paypal";
import { autoReconcileAccount } from "./reconcile";

type SupabaseServer = Awaited<ReturnType<typeof getSupabaseServer>>;

// Dispatches a sync by provider, then auto-reconciles the new transactions.
// Manual (imported) connections have nothing to pull. Reconciliation state is
// preserved because upserts never write the reconciled / matched_* columns.
export async function syncConnection(connectionId: string): Promise<void> {
  const supabase = await getSupabaseServer();
  const { data: conn } = await supabase
    .from("fm_bank_connections")
    .select("id, provider, access_token, sync_cursor")
    .eq("id", connectionId)
    .single();
  if (!conn) return;

  if (conn.provider === "plaid") await syncPlaid(supabase, conn.id, conn.access_token, conn.sync_cursor);
  else if (conn.provider === "starling") await syncStarling(supabase, conn.id);
  else if (conn.provider === "paypal") await syncPaypal(supabase, conn.id);
  // "manual": nothing to pull, but still auto-reconcile any imported rows.

  const { data: accounts } = await supabase.from("fm_bank_accounts").select("id").eq("connection_id", connectionId);
  for (const a of accounts ?? []) {
    await autoReconcileAccount(a.id).catch((e) => console.error("Auto-reconcile failed:", e));
  }
}

async function syncPlaid(supabase: SupabaseServer, connectionId: string, accessToken: string | null, cursor: string | null) {
  if (!accessToken) return;
  const { data: accounts } = await supabase
    .from("fm_bank_accounts")
    .select("id, external_account_id, currency")
    .eq("connection_id", connectionId);
  const byExternal = new Map((accounts ?? []).map((a) => [a.external_account_id, a]));

  const { added, modified, removed, nextCursor } = await syncTransactions(accessToken, cursor);
  const rows = [...added, ...modified]
    .filter((t) => !t.pending)
    .map((t) => {
      const acct = byExternal.get(t.account_id);
      if (!acct) return null;
      const amount = -Number(t.amount);
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

  if (rows.length) await supabase.from("fm_bank_transactions").upsert(rows, { onConflict: "account_id,external_transaction_id" });

  const removedIds = removed.map((r) => r.transaction_id);
  if (removedIds.length) {
    await supabase.from("fm_bank_transactions").delete().in("external_transaction_id", removedIds).eq("reconciled", false);
  }
  await supabase.from("fm_bank_connections").update({ sync_cursor: nextCursor }).eq("id", connectionId);

  try {
    const { accounts: fresh } = await getAccounts(accessToken);
    const now = new Date().toISOString();
    for (const a of fresh) {
      await supabase.from("fm_bank_accounts").update({ balance: a.balances.current, balance_at: now, last_synced_at: now }).eq("external_account_id", a.account_id);
    }
  } catch (e) {
    console.error("Plaid balance refresh failed:", e);
  }
}

async function syncStarling(supabase: SupabaseServer, connectionId: string) {
  const { data: accounts } = await supabase
    .from("fm_bank_accounts")
    .select("id, external_account_id, external_category_id, currency")
    .eq("connection_id", connectionId);
  if (!accounts?.length) return;

  const now = new Date();
  const since = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const minISO = since.toISOString();
  const maxISO = now.toISOString();
  const nowISO = now.toISOString();

  for (const acct of accounts) {
    if (!acct.external_category_id) continue;
    let items;
    try {
      items = await getStarlingFeed(acct.external_account_id, acct.external_category_id, minISO, maxISO);
    } catch (e) {
      console.error("Starling feed failed:", e);
      continue;
    }
    const rows = items
      .filter((it) => it.status === "SETTLED")
      .map((it) => {
        const amount = (it.direction === "IN" ? 1 : -1) * (it.amount.minorUnits / 100);
        return {
          account_id: acct.id,
          external_transaction_id: it.feedItemUid,
          booking_date: it.transactionTime ? it.transactionTime.slice(0, 10) : null,
          amount,
          currency: it.amount.currency || acct.currency,
          direction: amount >= 0 ? "in" : "out",
          counterparty: it.counterPartyName || null,
          description: it.reference || it.counterPartyName || null,
          raw: it as unknown as Record<string, unknown>,
        };
      });
    if (rows.length) await supabase.from("fm_bank_transactions").upsert(rows, { onConflict: "account_id,external_transaction_id" });

    const bal = await getStarlingBalance(acct.external_account_id);
    await supabase
      .from("fm_bank_accounts")
      .update({ balance: bal?.amount ?? null, balance_at: bal ? nowISO : null, last_synced_at: nowISO })
      .eq("id", acct.id);
  }
}

async function syncPaypal(supabase: SupabaseServer, connectionId: string) {
  const { data: account } = await supabase
    .from("fm_bank_accounts")
    .select("id, currency")
    .eq("connection_id", connectionId)
    .limit(1)
    .single();
  if (!account) return;

  let txns;
  try {
    txns = await getPaypalTransactions();
  } catch (e) {
    console.error("PayPal fetch failed:", e);
    return;
  }
  const rows = txns.map((t) => ({
    account_id: account.id,
    external_transaction_id: t.external_id,
    booking_date: t.date,
    amount: t.amount,
    currency: t.currency || account.currency,
    direction: t.amount >= 0 ? "in" : "out",
    counterparty: t.counterparty,
    description: t.description,
  }));
  if (rows.length) await supabase.from("fm_bank_transactions").upsert(rows, { onConflict: "account_id,external_transaction_id" });
  await supabase.from("fm_bank_accounts").update({ last_synced_at: new Date().toISOString() }).eq("id", account.id);
}
