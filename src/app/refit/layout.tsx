import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Refit Management | Independent Refit Project Management",
  keywords: [
    "yacht refit management",
    "yacht refit",
    "superyacht refit management",
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
    "Independent yacht refit management for sailing and motor yachts over 24m. 25 large yacht refit projects across 7 countries, from racing programmes to motor yacht rebuilds. SYBAss accredited, no yard commissions.",
  openGraph: {
    title: "Yacht Refit Management | Foreland Marine",
    description:
      "Independent yacht refit management and refit project management for sailing and motor yachts over 24m. 25 projects across 7 countries.",
    type: "website",
    url: "https://forelandmarine.com/refit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Refit Management | Foreland Marine",
    description:
      "Independent yacht refit management for sailing and motor yachts over 24m. SYBAss accredited.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/refit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
