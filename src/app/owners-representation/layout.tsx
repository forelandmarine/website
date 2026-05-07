import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht New Build Project Management | Foreland Marine",
  description:
    "Independent project management for yacht new builds, 24 to 60 metres. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees. Sailing and motor yachts, performance sailing and J Class specialists.",
  keywords: [
    "yacht new build project management",
    "yacht new build management",
    "superyacht new build project management",
    "new build project management",
    "yacht new build",
    "superyacht new build",
    "performance sailing yacht new build",
    "J Class new build",
    "carbon composite yacht new build",
    "independent yacht new build",
    "SYBAss accredited",
    "YORR registered",
  ],
  openGraph: {
    title: "Yacht New Build Project Management | Foreland Marine",
    description:
      "Independent project management for yacht new builds, 24 to 60 metres. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees.",
    type: "website",
    url: "https://forelandmarine.com/owners-representation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht New Build Project Management | Foreland Marine",
    description:
      "Independent project management for yacht new builds. SYBAss accredited, YORR registered, no commissions.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/owners-representation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
