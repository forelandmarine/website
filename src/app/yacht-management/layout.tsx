import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Yacht Management",
  keywords: [
    "independent yacht management",
    "yacht management",
    "superyacht management",
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
    "Independent yacht management acting on the owner's side only. ISM compliance, crew, finances, class and flag for sailing and motor yachts 24 to 60 metres.",
  openGraph: {
    title: "Independent Yacht Management | Foreland Marine",
    description:
      "Independent yacht management acting on the owner's side only. ISM compliance, crew, finances, class and flag. 24 to 60 metres.",
    type: "website",
    url: "https://www.forelandmarine.com/yacht-management",
  },
  twitter: {
    card: "summary_large_image",
    title: "Independent Yacht Management | Foreland Marine",
    description:
      "Owner-side only yacht management. ISM compliance, crew, finances, class and flag. No broker commissions, no charter fees.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/yacht-management",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
