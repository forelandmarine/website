import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Yacht Management | Superyacht Management Services",
  keywords: [
    "yacht management",
    "superyacht management",
    "independent yacht management",
    "yacht management company",
    "superyacht management services",
    "ISM compliance",
    "ISM Code yacht",
    "crew management",
    "yacht crew management",
    "yacht operations",
    "yacht financial management",
    "MLC compliance",
    "class and flag state",
    "owner-focused yacht management",
  ],
  description:
    "Independent, owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state requirements. No brokerage, no charter commissions, no supplier kickbacks.",
  openGraph: {
    title: "Independent Yacht Management | Superyacht Management Services",
    description:
      "Independent, owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state requirements.",
    type: "website",
    url: "https://forelandmarine.com/yacht-management",
  },
  twitter: {
    card: "summary_large_image",
    title: "Independent Yacht Management | Foreland Marine",
    description:
      "Owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/yacht-management",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
