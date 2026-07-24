// Starling Bank API — free, read-only, for your own account via a Personal
// Access Token (developer.starlingbank.com). No OAuth flow needed.
//
// Requires STARLING_ACCESS_TOKEN (read scopes: account, balance, transaction).
// STARLING_ENV selects production (default) or sandbox.

const ENV = (process.env.STARLING_ENV || "production").toLowerCase();
const BASE = ENV === "sandbox" ? "https://api-sandbox.starlingbank.com" : "https://api.starlingbank.com";

export function starlingEnabled(): boolean {
  return Boolean(process.env.STARLING_ACCESS_TOKEN);
}

async function sGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.STARLING_ACCESS_TOKEN}`,
      Accept: "application/json",
      "User-Agent": "Foreland-Marine-Ops",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Starling GET ${path} failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export type StarlingAccount = {
  accountUid: string;
  defaultCategory: string;
  currency: string;
  name?: string;
};

export async function getStarlingAccounts(): Promise<StarlingAccount[]> {
  const data = await sGet<{ accounts: StarlingAccount[] }>("/api/v2/accounts");
  return data.accounts ?? [];
}

export async function getStarlingBalance(accountUid: string): Promise<{ amount: number; currency: string } | null> {
  try {
    const data = await sGet<{ effectiveBalance: { minorUnits: number; currency: string } }>(
      `/api/v2/accounts/${accountUid}/balance`,
    );
    const b = data.effectiveBalance;
    if (!b) return null;
    return { amount: b.minorUnits / 100, currency: b.currency };
  } catch {
    return null;
  }
}

export type StarlingFeedItem = {
  feedItemUid: string;
  amount: { currency: string; minorUnits: number };
  direction: "IN" | "OUT";
  counterPartyName?: string;
  reference?: string;
  transactionTime: string;
  status: string;
};

export async function getStarlingFeed(
  accountUid: string,
  categoryUid: string,
  sinceISO: string,
  untilISO: string,
): Promise<StarlingFeedItem[]> {
  const data = await sGet<{ feedItems: StarlingFeedItem[] }>(
    `/api/v2/feed/account/${accountUid}/category/${categoryUid}/transactions-between?minTransactionTimestamp=${encodeURIComponent(sinceISO)}&maxTransactionTimestamp=${encodeURIComponent(untilISO)}`,
  );
  return data.feedItems ?? [];
}
