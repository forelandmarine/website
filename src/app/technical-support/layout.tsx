import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Support for Yachts Over 24m | Foreland Marine",
  description:
    "An annual technical support programme for sailing and motor yachts over 24 metres. Senior engineers on call day and night, hand-carried parts, annual planned maintenance system check. From £250 per month. Foreland Marine.",
  keywords: [
    "yacht technical support",
    "superyacht technical support",
    "yacht engineering support",
    "yacht on call engineer",
    "yacht hand carry parts",
    "yacht parts delivery",
    "yacht remote support",
    "planned maintenance system audit",
    "PMS audit yacht",
    "yacht emergency repair",
    "Foreland Marine technical support",
  ],
  openGraph: {
    title: "Technical Support for Yachts Over 24m | Foreland Marine",
    description:
      "An annual technical support programme for sailing and motor yachts over 24 metres. Senior engineers on call day and night, hand-carried parts, annual PMS check. From £250 per month.",
    type: "website",
    url: "https://forelandmarine.com/technical-support",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Support for Yachts Over 24m | Foreland Marine",
    description:
      "Senior engineers on call day and night. Hand-carried parts. Annual PMS check. From £250 per month.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/technical-support",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
