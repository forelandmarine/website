// Plaid — read-only account + transaction data (UK Open Banking).
// Docs: https://plaid.com/docs/
//
// Requires PLAID_CLIENT_ID + PLAID_SECRET (from dashboard.plaid.com). PLAID_ENV
// selects sandbox (default) or production. Access tokens are long-lived and
// stored per Item in fm_bank_connections.access_token (RLS: owner/bookkeeper).

const ENV = (process.env.PLAID_ENV || "sandbox").toLowerCase();
const BASE = ENV === "production" ? "https://production.plaid.com" : "https://sandbox.plaid.com";

export function plaidEnabled(): boolean {
  return Boolean(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET);
}

export function plaidEnv(): string {
  return ENV;
}

async function plaid<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      ...body,
    }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Plaid ${path} failed: ${data.error_code || res.status} ${data.error_message || ""}`);
  }
  return data as T;
}

export async function createLinkToken(clientUserId: string): Promise<string> {
  const data = await plaid<{ link_token: string }>("/link/token/create", {
    user: { client_user_id: clientUserId },
    client_name: "Foreland Marine",
    products: ["transactions"],
    country_codes: ["GB"],
    language: "en",
  });
  return data.link_token;
}

export async function exchangePublicToken(publicToken: string): Promise<{ accessToken: string; itemId: string }> {
  const data = await plaid<{ access_token: string; item_id: string }>("/item/public_token/exchange", {
    public_token: publicToken,
  });
  return { accessToken: data.access_token, itemId: data.item_id };
}

export type PlaidAccount = {
  account_id: string;
  name: string;
  mask?: string;
  balances: { current: number | null; iso_currency_code: string | null };
};

export async function getAccounts(accessToken: string): Promise<{ accounts: PlaidAccount[]; institutionId?: string }> {
  const data = await plaid<{ accounts: PlaidAccount[]; item: { institution_id?: string } }>("/accounts/get", {
    access_token: accessToken,
  });
  return { accounts: data.accounts, institutionId: data.item?.institution_id };
}

export async function getInstitutionName(institutionId: string): Promise<string | null> {
  try {
    const data = await plaid<{ institution: { name: string } }>("/institutions/get_by_id", {
      institution_id: institutionId,
      country_codes: ["GB"],
    });
    return data.institution?.name ?? null;
  } catch {
    return null;
  }
}

export type PlaidTransaction = {
  transaction_id: string;
  account_id: string;
  amount: number; // Plaid sign: positive = money OUT of the account, negative = money IN
  iso_currency_code: string | null;
  unofficial_currency_code: string | null;
  date: string;
  name: string;
  merchant_name: string | null;
  pending: boolean;
};

// Pulls all pages of /transactions/sync from the given cursor.
export async function syncTransactions(
  accessToken: string,
  cursor: string | null,
): Promise<{ added: PlaidTransaction[]; modified: PlaidTransaction[]; removed: { transaction_id: string }[]; nextCursor: string }> {
  const added: PlaidTransaction[] = [];
  const modified: PlaidTransaction[] = [];
  const removed: { transaction_id: string }[] = [];
  let next = cursor;
  let hasMore = true;
  let guard = 0;

  while (hasMore && guard < 20) {
    guard++;
    const data = await plaid<{
      added: PlaidTransaction[];
      modified: PlaidTransaction[];
      removed: { transaction_id: string }[];
      next_cursor: string;
      has_more: boolean;
    }>("/transactions/sync", { access_token: accessToken, cursor: next ?? undefined });
    added.push(...data.added);
    modified.push(...data.modified);
    removed.push(...data.removed);
    next = data.next_cursor;
    hasMore = data.has_more;
  }

  return { added, modified, removed, nextCursor: next ?? "" };
}
