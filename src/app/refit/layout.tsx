import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superyacht Refit Project Management | Foreland Marine",
  keywords: ["superyacht refit", "yacht refit project management", "refit shipyard", "sailing yacht refit", "motor yacht refit", "vessel restoration", "refit budget management", "yacht refit consultancy"],
  description:
    "Refit project management for motor and sailing yachts over 24m. 25 large yacht projects across 7 countries, from high-profile racing programmes to in-depth motor yacht rebuilds.",
  openGraph: {
    title: "Yacht Refit Project Management",
    description:
      "Refit project management for sailing and motor yachts over 24m. 25 large yacht projects across 7 countries, from racing programmes to full motor yacht rebuilds.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/refit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
