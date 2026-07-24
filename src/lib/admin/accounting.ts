// Accounting + tax helpers for the reports module. UK Ltd company: VAT returns
// (MTD box 1-9) and Corporation Tax with marginal relief. All figures are best-
// estimate management figures, not a substitute for filed accounts.

export type Period = { from: string; to: string; label: string };

// Foreland's financial year runs to 30 April (company incorporated 2024). The
// FY labelled "2026" covers 1 May 2025 – 30 April 2026. Editable if HMRC differs.
const FY_END_MONTH = 4; // April
const FY_END_DAY = 30;

export function financialYear(endYear: number): Period {
  const from = `${endYear - 1}-05-01`;
  const to = `${endYear}-04-30`;
  return { from, to, label: `FY ${endYear} (1 May ${endYear - 1} – 30 Apr ${endYear})` };
}

export function currentFinancialYearEnd(today: Date): number {
  const y = today.getUTCFullYear();
  const afterEnd =
    today.getUTCMonth() + 1 > FY_END_MONTH ||
    (today.getUTCMonth() + 1 === FY_END_MONTH && today.getUTCDate() > FY_END_DAY);
  return afterEnd ? y + 1 : y;
}

// VAT quarters aligned to the financial year end (Apr): quarters end Jul, Oct,
// Jan, Apr. q = 1..4 within the FY labelled endYear.
export function vatQuarter(endYear: number, q: number): Period {
  const startMonthIndex = 4 + (q - 1) * 3; // May=4 (0-based)
  const startYear = endYear - 1 + Math.floor(startMonthIndex / 12);
  const sm = startMonthIndex % 12;
  const start = new Date(Date.UTC(startYear, sm, 1));
  const end = new Date(Date.UTC(startYear, sm + 3, 0)); // last day of the 3rd month
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const label = `Q${q} ${start.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}–${end.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })}`;
  return { from: iso(start), to: iso(end), label };
}

// Corporation Tax (FY2023 onward): 19% up to £50k, 25% over £250k, marginal
// relief (3/200) between. Assumes one associated company and a 12-month period.
export function corporationTax(profit: number): { tax: number; effectiveRate: number; band: string } {
  const lower = 50000;
  const upper = 250000;
  const mainRate = 0.25;
  const smallRate = 0.19;
  const mrFraction = 3 / 200;

  let tax: number;
  let band: string;
  if (profit <= 0) {
    tax = 0;
    band = "No taxable profit";
  } else if (profit <= lower) {
    tax = profit * smallRate;
    band = "Small profits rate (19%)";
  } else if (profit >= upper) {
    tax = profit * mainRate;
    band = "Main rate (25%)";
  } else {
    tax = profit * mainRate - (upper - profit) * mrFraction;
    band = "Marginal relief";
  }
  return { tax, effectiveRate: profit > 0 ? tax / profit : 0, band };
}
