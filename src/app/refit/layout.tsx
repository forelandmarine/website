import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Refit Project Management | Independent, Owner-Side",
  keywords: [
    "yacht refit project management",
    "superyacht refit project management",
    "yacht refit management",
    "yacht refit",
    "superyacht refit",
    "refit project management",
    "refit shipyard",
    "sailing yacht refit",
    "motor yacht refit",
    "vessel restoration",
    "refit budget management",
    "yacht refit consultancy",
    "independent yacht refit",
  ],
  description:
    "Yacht refit project management for sailing and motor yachts 24 to 60 metres. 25 projects across 7 countries, delivered on time and on budget. Owner-side only.",
  openGraph: {
    title: "Yacht Refit Project Management | Foreland Marine",
    description:
      "Yacht refit project management for sailing and motor yachts 24 to 60 metres. 25 projects across 7 countries. Owner-side only, no yard commissions.",
    type: "website",
    url: "https://www.forelandmarine.com/refit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Refit Project Management | Foreland Marine",
    description:
      "Independent yacht refit project management for sailing and motor yachts 24 to 60 metres. Owner-side only.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/refit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
