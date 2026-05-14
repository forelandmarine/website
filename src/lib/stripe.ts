import Stripe from "stripe";
import type { TierSlug, Currency, BillingCycle } from "@/lib/technical-support";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  _stripe = new Stripe(key, {
    apiVersion: "2026-04-22.dahlia",
    typescript: true,
  });
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver);
  },
});

const priceEnvKey = (tier: TierSlug, currency: Currency, cycle: BillingCycle) =>
  `STRIPE_PRICE_${tier.toUpperCase()}_${currency.toUpperCase()}_${cycle.toUpperCase()}`;

export function getPriceId(tier: TierSlug, currency: Currency, cycle: BillingCycle): string {
  const key = priceEnvKey(tier, currency, cycle);
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing Stripe price env var: ${key}`);
  }
  return value;
}
