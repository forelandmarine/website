"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { type Currency } from "@/lib/technical-support";

const CURRENCY_SYMBOL: Record<Currency, string> = {
  gbp: "£",
  eur: "€",
  usd: "$",
};

function PayInner() {
  const params = useSearchParams();
  const canceled = params.get("canceled") === "1";
  const paramCurrency = (params.get("currency") || "").toLowerCase();

  const [amount, setAmount] = useState(params.get("amount") || "");
  const [currency, setCurrency] = useState<Currency>(
    ["gbp", "eur", "usd"].includes(paramCurrency) ? (paramCurrency as Currency) : "gbp",
  );
  const [reference, setReference] = useState(params.get("ref") || "");
  const [payerName, setPayerName] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [note, setNote] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numericAmount = Number(amount);
  const amountValid = Number.isFinite(numericAmount) && numericAmount >= 1;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!amountValid) {
      setError("Please enter a valid amount.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numericAmount,
          currency,
          reference,
          payerName,
          payerEmail,
          note,
        }),
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
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
            Pay an invoice.
          </h1>
          <p className="text-muted leading-relaxed">
            Settle an invoice or an agreed fee by card. Enter the amount and your details below and we will hand you to Stripe, our payments provider, for secure checkout. A receipt is emailed automatically.
          </p>
        </div>

        {canceled && (
          <div className="mb-8 border border-white/20 bg-bg1 px-5 py-4 text-sm text-muted">
            Payment was cancelled. Nothing has been charged — you can try again below.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* AMOUNT */}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Amount
            </legend>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                {(["gbp", "eur", "usd"] as Currency[]).map((c) => {
                  const active = currency === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-4 py-3 text-sm font-semibold border transition-colors ${
                        active
                          ? "border-accent bg-accent text-white"
                          : "border-white/15 text-muted hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {c.toUpperCase()}
                    </button>
                  );
                })}
              </div>
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg">
                  {CURRENCY_SYMBOL[currency]}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="1"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-bg2 border border-white/20 text-white pl-9 pr-4 py-3 text-lg placeholder-white/35 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 hover:border-white/30 transition-colors"
                />
              </div>
            </div>
          </fieldset>

          {/* REFERENCE */}
          <fieldset className="border-t border-white/10 pt-10">
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Reference
            </legend>
            <div className="grid grid-cols-1 gap-5">
              <PayField
                label="Invoice or reference number"
                value={reference}
                onChange={setReference}
                placeholder="e.g. FM-2026-0142"
              />
              <PayField
                label="Note (optional)"
                value={note}
                onChange={setNote}
                placeholder="What is this payment for?"
              />
            </div>
          </fieldset>

          {/* PAYER */}
          <fieldset className="border-t border-white/10 pt-10">
            <legend className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Your details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PayField label="Your name" required value={payerName} onChange={setPayerName} />
              <PayField label="Email (for receipt)" type="email" required value={payerEmail} onChange={setPayerEmail} />
            </div>
            <p className="mt-3 text-xs text-muted/70 leading-relaxed">
              Billing address and card details are collected on the next step by Stripe. We never see your card number.
            </p>
          </fieldset>

          {/* SUBMIT */}
          <div className="border-t border-white/10 pt-10">
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
                {submitting
                  ? "Redirecting to Stripe…"
                  : amountValid
                    ? `Continue to payment (${CURRENCY_SYMBOL[currency]}${numericAmount.toLocaleString()})`
                    : "Continue to payment"}
              </button>
              <Link
                href="/contact"
                className="text-sm text-muted hover:text-white transition-colors text-center sm:text-left"
              >
                Back to contact
              </Link>
            </div>

            <p className="text-xs text-muted/60 mt-6 leading-relaxed">
              Payments are processed securely by Stripe. This is a one-off charge — nothing recurring is set up.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function PayField({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder = "",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold uppercase tracking-widest text-white/90 mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg2 border border-white/20 text-white px-4 py-3 text-sm placeholder-white/35 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 hover:border-white/30 transition-colors"
      />
    </label>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-bg0 py-24 text-center text-muted">Loading payment form...</div>
      }
    >
      <PayInner />
    </Suspense>
  );
}
