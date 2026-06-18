"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TIER_NAMES,
  TIER_PRICES_MONTHLY,
  TIER_PRICES_ANNUAL,
  type TierSlug,
  type BillingCycle,
} from "@/lib/technical-support";

type TierMeta = {
  slug: TierSlug;
  lines: string[];
  highlight?: boolean;
};

type Props = {
  tiers: TierMeta[];
};

export default function TechnicalSupportPricing({ tiers }: Props) {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <>
      <div className="mb-8">
        <div className="inline-flex border border-white/15">
          {(["monthly", "annual"] as BillingCycle[]).map((c) => {
            const active = cycle === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                className={`px-6 py-2.5 text-sm font-semibold capitalize transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted mt-3">
          Annual billing: twelve months for the price of ten.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-animate-stagger>
        {tiers.map((tier) => {
          const monthly = TIER_PRICES_MONTHLY[tier.slug];
          const annual = TIER_PRICES_ANNUAL[tier.slug];
          const isAnnual = cycle === "annual";
          return (
            <div
              key={tier.slug}
              data-animate="fade-up"
              className={`relative bg-bg2 border border-white/8 flex flex-col p-8 ${
                tier.highlight ? "ring-1 ring-accent/40" : ""
              }`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-70" />
              {tier.highlight && (
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-accent font-semibold">
                  Most chosen
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                {TIER_NAMES[tier.slug]}
              </p>
              <div className="mb-1">
                <span className="text-4xl font-light text-white">
                  £{(isAnnual ? annual.gbp : monthly.gbp).toLocaleString()}
                </span>
                <span className="text-sm text-muted ml-2">
                  {isAnnual ? "per year" : "per month"}
                </span>
              </div>
              <p className="text-sm text-muted/80 mb-1">
                {isAnnual
                  ? `€${annual.eur.toLocaleString()} · $${annual.usd.toLocaleString()}`
                  : `€${monthly.eur.toLocaleString()} · $${monthly.usd.toLocaleString()}`}
              </p>
              {isAnnual && (
                <p className="text-sm text-muted mb-4">
                  vs £{(monthly.gbp * 12).toLocaleString()} on monthly billing.
                </p>
              )}
              {!isAnnual && <div className="mb-4" />}
              <div className="h-px bg-white/10 mb-5" />
              <ul className="space-y-2.5 mb-7 flex-1">
                {tier.lines.map((line, i) => (
                  <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                    <span className="text-accent flex-shrink-0">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/technical-support/sign-up?tier=${tier.slug}&cycle=${cycle}`}
                className="inline-flex items-center justify-center bg-accent text-white font-semibold text-sm px-6 py-3 rounded hover:bg-accent/90 transition-colors"
              >
                Sign up to {TIER_NAMES[tier.slug]}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
