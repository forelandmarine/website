import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Surveys | Sub and Over 24 Metres",
  keywords: [
    "yacht survey",
    "yacht surveyor",
    "pre-purchase yacht survey",
    "superyacht survey",
    "sailing yacht survey",
    "motor yacht survey",
    "condition survey",
    "insurance survey yacht",
    "sub 24m yacht survey",
    "over 24m yacht survey",
    "small commercial vessel survey",
    "MCA coding survey",
    "Large Yacht Code survey",
    "classification survey",
    "rig survey",
    "osmosis survey",
    "tonnage measurement",
  ],
  description:
    "Independent yacht surveys for vessels under and over 24 metres. Pre-purchase, insurance, condition, coding, and class surveys for sailing and motor yachts.",
  openGraph: {
    title: "Yacht Surveys | Foreland Marine",
    description:
      "Independent yacht surveys for vessels under and over 24 metres. Pre-purchase, insurance, condition, coding, and class surveys for sailing and motor yachts.",
    type: "website",
    url: "https://www.forelandmarine.com/technical-consultancy/surveys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Surveys | Foreland Marine",
    description:
      "Independent yacht surveys for vessels under and over 24 metres. Pre-purchase, insurance, condition, coding, and class surveys.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/technical-consultancy/surveys",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
