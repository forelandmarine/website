import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Superyacht Management | Foreland Marine",
  keywords: ["yacht management", "superyacht management", "independent yacht management", "ISM compliance", "crew management", "yacht operations", "yacht management company", "superyacht management services"],
  description:
    "Independent, owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state requirements.",
  openGraph: {
    title: "Independent Superyacht Management",
    description:
      "Owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, and class and flag state requirements.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/yacht-management",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
