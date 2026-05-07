import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Technical Consultancy | Yacht Racing & Race Management",
  keywords: [
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
    "Specialist yacht technical consultancy across yacht racing performance, race management, yacht logistics, hydraulic and navigation systems, naval architecture, mechanical installation, and AV/IT automation.",
  openGraph: {
    title: "Yacht Technical Consultancy | Yacht Racing & Race Management",
    description:
      "Specialist yacht technical consultancy covering yacht racing, race management, yacht logistics, hydraulic and navigation systems, naval architecture, and AV/IT automation.",
    type: "website",
    url: "https://forelandmarine.com/technical-consultancy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Technical Consultancy | Foreland Marine",
    description:
      "Yacht technical consultancy across racing performance, race management, yacht logistics, hydraulics, navigation, naval architecture, and AV/IT.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/technical-consultancy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
