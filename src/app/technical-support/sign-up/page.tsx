"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SectionLabel } from "@/components/ui";
import { TIER_NAMES, TIER_PRICES, formatPrice, isTier, isCurrency, type TierSlug, type Currency } from "@/lib/technical-support";

const TIER_ORDER: TierSlug[] = ["standby", "direct", "captive"];

const TIER_LINES: Record<TierSlug, string[]> = {
  standby: [
    "Four on-call engineer hours per month.",
    "Worldwide parts sourcing and freight coordination.",
    "Annual PMS check, emergency repair kit.",
  ],
  direct: [
    "Twelve on-call engineer hours per month.",
    "Three European hand-carries, one international.",
    "Quarterly check-in. Everything in Standby.",
  ],
  captive: [
    "Thirty on-call engineer hours per month.",
    "Five European hand-carries, two international.",
    "Assigned lead engineer, pre-passage audit.",
  ],
};

function SignUpInner() {
  const params = useSearchParams();
  const initialTier = params.get("tier");
  const canceled = params.get("canceled") === "1";

  const [tier, setTier] = useState<TierSlug>(
    isTier(initialTier) ? initialTier : "direct"
  );
  const [currency, setCurrency] = useState<Currency>("gbp");

  const [yachtName, setYachtName] = useState("");
  const [yachtImo, setYachtImo] = useState("");
  const [yachtMmsi, setYachtMmsi] = useState("");
  const [yachtLengthM, setYachtLengthM] = useState("");
  const [yachtFlag, setYachtFlag] = useState("");
  const [yachtHomePort, setYachtHomePort] = useState("");

  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingVatNumber, setBillingVatNumber] = useState("");

  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");

  const [engineerName, setEngineerName] = useState("");
  const [engineerEmail, setEngineerEmail] = useState("");
  const [engineerPhone, setEngineerPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isTier(initialTier)) setTier(initialTier);
  }, [initialTier]);

  const priceDisplay = useMemo(() => formatPrice(tier, currency), [tier, currency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const body = {
      tier,
      currency,
      yachtName,
      yachtImo,
      yachtMmsi,
      yachtLengthM: yachtLengthM ? Number(yachtLengthM) : undefined,
      yachtFlag,
      yachtHomePort,
      billingName,
      billingEmail,
      billingAddress,
      billingCountry,
      billingVatNumber,
      captainName,
      captainEmail,
      captainPhone,
      engineerName,
      engineerEmail,
      engineerPhone,
    };

    try {
      const res = await fetch("/api/technical-support/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      if (!data.url) throw new Error("Stripe did not return a redirect URL.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-bg0 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel>Sign up</SectionLabel>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
            Five minutes of paperwork.
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            Vessel and contact details first, payment second, welcome email third. After that, write to <a className="text-accent hover:text-white transition-colors" href="mailto:info@forelandmarine.com">info@forelandmarine.com</a> with any issue or special request.
          </p>
        </div>

        {canceled && (
          <div className="mb-8 border border-white/20 bg-bg1 px-5 py-4 text-sm text-muted">
            Payment was cancelled. Your details have been saved — you can complete payment by submitting the form again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* TIER SELECTION */}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Programme
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TIER_ORDER.map((t) => {
                const active = tier === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`text-left p-5 border transition-colors ${
                      active
                        ? "border-accent bg-bg2 ring-1 ring-accent/40"
                        : "border-white/10 bg-bg1 hover:border-white/30"
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">
                      {TIER_NAMES[t]}
                    </p>
                    <p className="text-2xl font-light text-white mb-1">
                      {formatPrice(t, currency)}
                      <span className="text-sm text-muted ml-2">/ month</span>
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-muted leading-relaxed">
                      {TIER_LINES[t].map((line, i) => (
                        <li key={i}>· {line}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* CURRENCY */}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Billing currency
            </legend>
            <div className="flex gap-2">
              {(["gbp", "eur", "usd"] as Currency[]).map((c) => {
                const active = currency === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`px-5 py-2.5 text-sm font-semibold border transition-colors ${
                      active
                        ? "border-accent bg-accent text-white"
                        : "border-white/15 text-muted hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {c.toUpperCase()} {TIER_PRICES[tier][c].toLocaleString()}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted/70 mt-3">
              GBP rates are exact. EUR and USD shown at indicative cross-rates and locked at the moment of payment.
            </p>
          </fieldset>

          {/* VESSEL */}
          <fieldset className="border-t border-white/10 pt-10">
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Vessel
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Yacht name" required value={yachtName} onChange={setYachtName} />
              <FormField label="Home port" value={yachtHomePort} onChange={setYachtHomePort} />
              <FormField label="Length (metres)" type="number" value={yachtLengthM} onChange={setYachtLengthM} />
              <FormField label="Flag state" value={yachtFlag} onChange={setYachtFlag} />
              <FormField label="IMO number" value={yachtImo} onChange={setYachtImo} />
              <FormField label="MMSI" value={yachtMmsi} onChange={setYachtMmsi} />
            </div>
          </fieldset>

          {/* BILLING */}
          <fieldset className="border-t border-white/10 pt-10">
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Billing
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Billing entity name" required value={billingName} onChange={setBillingName} />
              <FormField label="Billing email" type="email" required value={billingEmail} onChange={setBillingEmail} />
              <FormField label="Billing address" value={billingAddress} onChange={setBillingAddress} className="md:col-span-2" />
              <FormField label="Country" value={billingCountry} onChange={setBillingCountry} />
              <FormField label="VAT number (if any)" value={billingVatNumber} onChange={setBillingVatNumber} />
            </div>
          </fieldset>

          {/* CAPTAIN */}
          <fieldset className="border-t border-white/10 pt-10">
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Captain
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Captain name" required value={captainName} onChange={setCaptainName} />
              <FormField label="Captain email" type="email" required value={captainEmail} onChange={setCaptainEmail} />
              <FormField label="Captain phone" value={captainPhone} onChange={setCaptainPhone} />
            </div>
          </fieldset>

          {/* ENGINEER (optional) */}
          <fieldset className="border-t border-white/10 pt-10">
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Chief Engineer <span className="text-muted/60 font-light normal-case tracking-normal ml-2">(optional)</span>
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Engineer name" value={engineerName} onChange={setEngineerName} />
              <FormField label="Engineer email" type="email" value={engineerEmail} onChange={setEngineerEmail} />
              <FormField label="Engineer phone" value={engineerPhone} onChange={setEngineerPhone} />
            </div>
          </fieldset>

          {/* SUMMARY + SUBMIT */}
          <div className="border-t border-white/10 pt-10">
            <div className="bg-bg1 border border-white/8 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
                    Your subscription
                  </p>
                  <p className="text-lg text-white">
                    {TIER_NAMES[tier]} · {priceDisplay} per month
                  </p>
                  <p className="text-xs text-muted/70 mt-1">
                    Annual term. Monthly billing. Thirty days&rsquo; notice to leave.
                  </p>
                </div>
                <p className="text-xs text-muted/60">
                  Card details are entered on the next page, on Stripe&rsquo;s secure checkout.
                </p>
              </div>
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-300 bg-red-900/20 border border-red-500/30 px-4 py-3">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center bg-accent text-white font-semibold text-sm px-8 py-3.5 rounded hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Redirecting to Stripe..." : `Continue to payment (${priceDisplay} per month)`}
              </button>
              <Link
                href="/technical-support"
                className="text-sm text-muted hover:text-white transition-colors text-center sm:text-left"
              >
                Back to overview
              </Link>
            </div>

            <p className="text-xs text-muted/60 mt-6 leading-relaxed">
              By continuing you agree to monthly billing on the chosen card and the standard Foreland Technical Support terms. You can cancel with thirty days&rsquo; notice at any time after the initial annual term.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted/80 mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg1 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
      />
    </label>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-bg0 py-24 text-center text-muted">Loading sign-up form...</div>
      }
    >
      <SignUpInner />
    </Suspense>
  );
}
