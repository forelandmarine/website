import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Payment",
  description:
    "Settle an invoice or agreed fee with Foreland Marine securely by card. Payments are processed by Stripe.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.forelandmarine.com/pay",
  },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
