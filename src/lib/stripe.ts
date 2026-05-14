import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export type TierSlug = "standby" | "direct" | "captive";
export type Currency = "gbp" | "eur" | "usd";

const priceEnvKey = (tier: TierSlug, currency: Currency) =>
  `STRIPE_PRICE_${tier.toUpperCase()}_${currency.toUpperCase()}`;

export function getPriceId(tier: TierSlug, currency: Currency): string {
  const key = priceEnvKey(tier, currency);
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing Stripe price env var: ${key}`);
  }
  return value;
}
