import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superyacht Refit Project Management",
  keywords: [
    "superyacht refit project management",
    "yacht refit management",
    "yacht refit",
    "superyacht refit",
    "yacht refit project management",
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
    "Independent superyacht refit project management for sailing and motor yachts 24 to 60 metres. Owner-side only, no yard commissions or broker fees.",
  openGraph: {
    title: "Superyacht Refit Project Management | Foreland Marine",
    description:
      "Independent superyacht refit project management for sailing and motor yachts 24 to 60 metres. Owner-side only, no yard commissions or broker fees.",
    type: "website",
    url: "https://www.forelandmarine.com/refit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superyacht Refit Project Management | Foreland Marine",
    description:
      "Independent superyacht refit project management for sailing and motor yachts 24 to 60 metres. Owner-side only.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/refit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
