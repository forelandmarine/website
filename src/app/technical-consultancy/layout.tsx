import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sailing Yacht Technical Consultancy",
  keywords: [
    "sailing yacht technical consultancy",
    "yacht technical consultancy",
    "superyacht technical consultancy",
    "yacht racing",
    "yacht racing performance",
    "race management",
    "yacht race management",
    "yacht logistics",
    "race logistics",
    "yacht campaign management",
    "marine engineering",
    "yacht systems",
    "naval architecture",
    "hydraulic systems yacht",
    "PLC control systems yacht",
    "marine AV IT",
    "yacht navigation systems",
  ],
  description:
    "Sailing yacht technical consultancy for performance and race engineering. Hydraulic systems, naval architecture, race management, AV and IT.",
  openGraph: {
    title: "Sailing Yacht Technical Consultancy | Foreland Marine",
    description:
      "Sailing yacht technical consultancy for performance and race engineering. Hydraulic systems, naval architecture, race management, AV and IT.",
    type: "website",
    url: "https://www.forelandmarine.com/technical-consultancy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sailing Yacht Technical Consultancy | Foreland Marine",
    description:
      "Sailing yacht technical consultancy for performance and race engineering. Hydraulics, naval architecture, race management.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/technical-consultancy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
