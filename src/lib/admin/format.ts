export type Currency = "gbp" | "eur" | "usd";

const CURRENCY_CODE: Record<string, string> = { gbp: "GBP", eur: "EUR", usd: "USD" };

export function money(n: number | null | undefined, currency: string = "gbp", opts?: { decimals?: boolean }): string {
  const code = CURRENCY_CODE[currency?.toLowerCase()] ?? "GBP";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: code,
    maximumFractionDigits: opts?.decimals ? 2 : 0,
  }).format(n ?? 0);
}

export function fmtDate(d: string | Date | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function fmtDateTime(d: string | Date | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function titleCase(s: string | null | undefined): string {
  if (!s) return "—";
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
