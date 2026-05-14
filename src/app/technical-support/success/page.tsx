import Link from "next/link";
import type { Metadata } from "next";
import { SectionLabel, ButtonPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Welcome aboard | Foreland Marine Technical Support",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <section className="bg-bg0 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionLabel>Welcome aboard</SectionLabel>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
          You&rsquo;re signed up.
        </h1>
        <p className="text-muted leading-relaxed text-base mb-4 max-w-xl mx-auto">
          A confirmation email has been sent to the billing and captain addresses. Stripe will email a receipt for the first payment, and renewals will happen automatically from the same card.
        </p>
        <p className="text-muted leading-relaxed text-base mb-10 max-w-xl mx-auto">
          A senior engineer will be in touch within two working days to schedule the annual PMS check and exchange direct numbers.
        </p>

        {/* Emergency line callout */}
        <div className="mx-auto max-w-xl mb-10 border border-accent/30 bg-bg2 px-6 py-5 text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent mb-1.5">
            Emergency line &middot; 24/7
          </p>
          <p className="text-2xl font-light text-white leading-tight">
            <a href="tel:+447921528168" className="text-white hover:text-accent transition-colors">
              +44 7921 528 168
            </a>
          </p>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            If anything is wrong, call this number. The line is open day and night.
          </p>
        </div>

        <p className="text-muted leading-relaxed text-base mb-10 max-w-xl mx-auto">
          For non-urgent matters, write to{" "}
          <a href="mailto:info@forelandmarine.com" className="text-accent hover:text-white transition-colors">
            info@forelandmarine.com
          </a>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonPrimary href="/">Return to homepage</ButtonPrimary>
          <Link
            href="/technical-support"
            className="inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors"
          >
            Re-read the programme
          </Link>
        </div>
      </div>
    </section>
  );
}
