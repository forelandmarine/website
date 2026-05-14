export type TierSlug = "standby" | "direct" | "captive";
export type Currency = "gbp" | "eur" | "usd";

export const TIER_NAMES: Record<TierSlug, string> = {
  standby: "Standby",
  direct: "Direct",
  captive: "Captive",
};

export const TIER_PRICES: Record<TierSlug, Record<Currency, number>> = {
  standby: { gbp: 250, eur: 295, usd: 315 },
  direct: { gbp: 500, eur: 585, usd: 630 },
  captive: { gbp: 1000, eur: 1170, usd: 1260 },
};

const CURRENCY_SYMBOL: Record<Currency, string> = {
  gbp: "£",
  eur: "€",
  usd: "$",
};

export function formatPrice(tier: TierSlug, currency: Currency): string {
  const value = TIER_PRICES[tier][currency];
  return `${CURRENCY_SYMBOL[currency]}${value.toLocaleString()}`;
}

export function isTier(value: unknown): value is TierSlug {
  return value === "standby" || value === "direct" || value === "captive";
}

export function isCurrency(value: unknown): value is Currency {
  return value === "gbp" || value === "eur" || value === "usd";
}
