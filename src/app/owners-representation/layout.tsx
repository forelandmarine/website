import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Owner's Representation | New Build & Refit",
  description:
    "Independent yacht owner's representation for new builds and refits. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees. Foreland Marine.",
  keywords: [
    "yacht owner's representation",
    "yacht owner's representative",
    "yacht owners representative",
    "independent owner's representative",
    "superyacht owner's representative",
    "new build owner's representation",
    "refit owner's representation",
    "owner's rep",
    "SYBAss accredited",
    "YORR registered",
  ],
  openGraph: {
    title: "Yacht Owner's Representation | New Build & Refit",
    description:
      "Independent yacht owner's representation for new builds and refits. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees.",
    type: "website",
    url: "https://forelandmarine.com/owners-representation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Owner's Representation | New Build & Refit",
    description:
      "Independent yacht owner's representation. SYBAss accredited, YORR registered, no commissions.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/owners-representation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
