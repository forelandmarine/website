import Link from "next/link";
import type { Metadata } from "next";
import { SectionLabel, ButtonPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Payment received | Foreland Marine",
  robots: { index: false, follow: false },
};

export default function PaySuccessPage() {
  return (
    <section className="bg-bg0 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionLabel>Payment received</SectionLabel>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
          Thank you.
        </h1>
        <p className="text-muted leading-relaxed text-base mb-4 max-w-xl mx-auto">
          Your payment has gone through. Stripe has emailed a receipt to the address you entered at checkout.
        </p>
        <p className="text-muted leading-relaxed text-base mb-10 max-w-xl mx-auto">
          If you need a VAT invoice or anything amended, write to{" "}
          <a href="mailto:info@forelandmarine.com" className="text-accent hover:text-white transition-colors">
            info@forelandmarine.com
          </a>{" "}
          and we will sort it out.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonPrimary href="/">Return to homepage</ButtonPrimary>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded hover:bg-white/10 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
