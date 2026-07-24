// PayPal — read-only transaction data via the Transaction Search API (free for
// your own business account). Requires PAYPAL_CLIENT_ID + PAYPAL_SECRET from a
// live app at developer.paypal.com with "Transaction Search" enabled.
// PAYPAL_ENV: live (default) | sandbox.

const ENV = (process.env.PAYPAL_ENV || "live").toLowerCase();
const BASE = ENV === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

export function paypalEnabled(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET);
}

async function token(): Promise<string> {
  const basic = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64");
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PayPal auth failed (${res.status})`);
  const data = await res.json();
  return data.access_token as string;
}

export type PaypalTxn = {
  external_id: string;
  date: string | null;
  amount: number; // + in, - out (PayPal already signs from the account's view)
  currency: string;
  counterparty: string | null;
  description: string | null;
};

type PPDetail = {
  transaction_info?: {
    transaction_id?: string;
    transaction_initiation_date?: string;
    transaction_amount?: { currency_code?: string; value?: string };
    transaction_status?: string;
    transaction_subject?: string;
    transaction_note?: string;
  };
  payer_info?: { email_address?: string; payer_name?: { alternate_full_name?: string } };
};

async function searchWindow(accessToken: string, startISO: string, endISO: string): Promise<PPDetail[]> {
  const out: PPDetail[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const url = `${BASE}/v1/reporting/transactions?start_date=${encodeURIComponent(startISO)}&end_date=${encodeURIComponent(endISO)}&fields=all&page_size=500&page=${page}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
    if (!res.ok) throw new Error(`PayPal transactions failed (${res.status})`);
    const data = await res.json();
    out.push(...(data.transaction_details ?? []));
    totalPages = Number(data.total_pages) || 1;
    page++;
  } while (page <= totalPages && page <= 10);
  return out;
}

// Pulls ~90 days in 30-day windows (the API caps each request at 31 days).
export async function getPaypalTransactions(): Promise<PaypalTxn[]> {
  const accessToken = await token();
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const details: PPDetail[] = [];
  for (let i = 0; i < 3; i++) {
    const end = new Date(now - i * 30 * day);
    const start = new Date(now - (i + 1) * 30 * day);
    details.push(...(await searchWindow(accessToken, start.toISOString(), end.toISOString())));
  }

  const seen = new Set<string>();
  const rows: PaypalTxn[] = [];
  for (const d of details) {
    const info = d.transaction_info ?? {};
    if (info.transaction_status !== "S") continue; // successful only
    const id = info.transaction_id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    rows.push({
      external_id: id,
      date: info.transaction_initiation_date ? info.transaction_initiation_date.slice(0, 10) : null,
      amount: Number(info.transaction_amount?.value ?? 0),
      currency: info.transaction_amount?.currency_code || "GBP",
      counterparty: d.payer_info?.payer_name?.alternate_full_name || d.payer_info?.email_address || null,
      description: info.transaction_subject || info.transaction_note || null,
    });
  }
  return rows;
}
