// GoCardless Bank Account Data (formerly Nordigen) — read-only Open Banking.
// Docs: https://bankaccountdata.gocardless.com/api/v2/
//
// Requires GC_SECRET_ID + GC_SECRET_KEY (create a free account at
// https://bankaccountdata.gocardless.com). Access tokens last 24h; we fetch a
// fresh one per operation, which is fine at this volume.

const BASE = "https://bankaccountdata.gocardless.com/api/v2";

export function gcEnabled(): boolean {
  return Boolean(process.env.GC_SECRET_ID && process.env.GC_SECRET_KEY);
}

async function gcToken(): Promise<string> {
  const res = await fetch(`${BASE}/token/new/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      secret_id: process.env.GC_SECRET_ID,
      secret_key: process.env.GC_SECRET_KEY,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GoCardless auth failed (${res.status})`);
  const data = await res.json();
  return data.access as string;
}

async function gcGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GoCardless GET ${path} failed (${res.status})`);
  return res.json() as Promise<T>;
}

export type Institution = { id: string; name: string; bic?: string; logo?: string };

export async function listInstitutions(country = "gb"): Promise<Institution[]> {
  const token = await gcToken();
  return gcGet<Institution[]>(`/institutions/?country=${encodeURIComponent(country)}`, token);
}

export async function createRequisition(args: {
  institutionId: string;
  redirect: string;
  reference: string;
}): Promise<{ id: string; link: string }> {
  const token = await gcToken();
  const res = await fetch(`${BASE}/requisitions/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      redirect: args.redirect,
      institution_id: args.institutionId,
      reference: args.reference,
      user_language: "EN",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GoCardless requisition failed (${res.status})`);
  const data = await res.json();
  return { id: data.id, link: data.link };
}

export async function getRequisition(id: string): Promise<{ status: string; accounts: string[] }> {
  const token = await gcToken();
  return gcGet(`/requisitions/${id}/`, token);
}

export type GcAccountMeta = { id: string; iban?: string; institution_id?: string; owner_name?: string; currency?: string };

export async function getAccountMeta(accountId: string): Promise<GcAccountMeta> {
  const token = await gcToken();
  return gcGet(`/accounts/${accountId}/`, token);
}

export async function getBalance(accountId: string): Promise<{ amount: number; currency: string } | null> {
  const token = await gcToken();
  const data = await gcGet<{ balances?: { balanceAmount: { amount: string; currency: string }; balanceType: string }[] }>(
    `/accounts/${accountId}/balances/`,
    token,
  );
  const balances = data.balances ?? [];
  // Prefer an "interim/closing available" style balance, else the first.
  const pick =
    balances.find((b) => /closingBooked|interimAvailable|expected/i.test(b.balanceType)) ?? balances[0];
  if (!pick) return null;
  return { amount: Number(pick.balanceAmount.amount), currency: pick.balanceAmount.currency };
}

export type GcTransaction = {
  transactionId?: string;
  internalTransactionId?: string;
  bookingDate?: string;
  valueDate?: string;
  transactionAmount: { amount: string; currency: string };
  creditorName?: string;
  debtorName?: string;
  remittanceInformationUnstructured?: string;
  additionalInformation?: string;
};

export async function getTransactions(
  accountId: string,
): Promise<{ booked: GcTransaction[]; pending: GcTransaction[] }> {
  const token = await gcToken();
  const data = await gcGet<{ transactions?: { booked?: GcTransaction[]; pending?: GcTransaction[] } }>(
    `/accounts/${accountId}/transactions/`,
    token,
  );
  return { booked: data.transactions?.booked ?? [], pending: data.transactions?.pending ?? [] };
}
