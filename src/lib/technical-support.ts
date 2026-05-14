export type TierSlug = "standby" | "direct" | "captive";
export type Currency = "gbp" | "eur" | "usd";
export type BillingCycle = "monthly" | "annual";

export const TIER_NAMES: Record<TierSlug, string> = {
  standby: "Standby",
  direct: "Direct",
  captive: "Captive",
};

// Monthly amounts in major units. Annual = 10 × monthly (two months free).
export const TIER_PRICES_MONTHLY: Record<TierSlug, Record<Currency, number>> = {
  standby: { gbp: 250, eur: 295, usd: 315 },
  direct: { gbp: 500, eur: 585, usd: 630 },
  captive: { gbp: 1000, eur: 1170, usd: 1260 },
};

export const TIER_PRICES_ANNUAL: Record<TierSlug, Record<Currency, number>> = {
  standby: { gbp: 2500, eur: 2950, usd: 3150 },
  direct: { gbp: 5000, eur: 5850, usd: 6300 },
  captive: { gbp: 10000, eur: 11700, usd: 12600 },
};

const CURRENCY_SYMBOL: Record<Currency, string> = {
  gbp: "£",
  eur: "€",
  usd: "$",
};

export function priceFor(tier: TierSlug, currency: Currency, cycle: BillingCycle): number {
  return cycle === "annual"
    ? TIER_PRICES_ANNUAL[tier][currency]
    : TIER_PRICES_MONTHLY[tier][currency];
}

export function formatPrice(tier: TierSlug, currency: Currency, cycle: BillingCycle = "monthly"): string {
  return `${CURRENCY_SYMBOL[currency]}${priceFor(tier, currency, cycle).toLocaleString()}`;
}

export function cycleSuffix(cycle: BillingCycle): string {
  return cycle === "annual" ? "per year" : "per month";
}

export function isTier(value: unknown): value is TierSlug {
  return value === "standby" || value === "direct" || value === "captive";
}

export function isCurrency(value: unknown): value is Currency {
  return value === "gbp" || value === "eur" || value === "usd";
}

export function isCycle(value: unknown): value is BillingCycle {
  return value === "monthly" || value === "annual";
}
