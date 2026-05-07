import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Owner's Representation | Yacht New Build & Refit",
  description:
    "Independent yacht owner's representation and superyacht representation for yacht new build and refit, 24 to 60 metres. SYBAss accredited, YORR registered. No yard commissions, no broker referral fees, no supplier kickbacks. Foreland Marine.",
  keywords: [
    "yacht owner's representation",
    "yacht owners representation",
    "yacht owner's representative",
    "superyacht representation",
    "superyacht owner's representation",
    "yacht new build",
    "yacht new build project management",
    "new build owner's representation",
    "new build project management",
    "independent owner's representative",
    "independent yacht new build",
    "performance sailing yacht new build",
    "J Class new build",
    "carbon composite yacht new build",
    "SYBAss accredited",
    "YORR registered",
  ],
  openGraph: {
    title: "Yacht Owner's Representation | Yacht New Build & Refit",
    description:
      "Independent yacht owner's representation and superyacht representation for yacht new build and refit, 24 to 60 metres. SYBAss accredited, YORR registered.",
    type: "website",
    url: "https://forelandmarine.com/owners-representation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Owner's Representation | Yacht New Build",
    description:
      "Independent yacht owner's representation and superyacht representation. SYBAss accredited, YORR registered, no commissions.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/owners-representation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
