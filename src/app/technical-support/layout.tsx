import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superyacht Technical Support",
  description:
    "Annual technical support for sailing and motor yachts over 24 metres. Senior engineers on call day and night, worldwide. From GBP 250 per month.",
  keywords: [
    "superyacht technical support",
    "yacht technical support",
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
    title: "Superyacht Technical Support | Foreland Marine",
    description:
      "Annual technical support for sailing and motor yachts over 24 metres. Senior engineers on call day and night, worldwide. From GBP 250 per month.",
    type: "website",
    url: "https://www.forelandmarine.com/technical-support",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superyacht Technical Support | Foreland Marine",
    description:
      "Senior engineers on call day and night, worldwide. Hand-carried parts. Annual PMS check. From GBP 250 per month.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/technical-support",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
