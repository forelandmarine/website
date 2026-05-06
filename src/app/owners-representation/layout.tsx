import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Owner's Representative | Independent Owner's Representation",
  description:
    "Independent yacht owner's representation for new builds and refits, 24 to 60 metres. SYBAss accredited, YORR registered, no commissions, no yard affiliations. Foreland Marine.",
  keywords: [
    "yacht owner's representative",
    "yacht owner's representation",
    "yacht owners representative",
    "independent owner's representative",
    "superyacht owner's representative",
    "owner's rep",
    "new build owner's representation",
    "refit owner's representation",
    "SYBAss accredited",
    "YORR registered",
  ],
  openGraph: {
    title: "Yacht Owner's Representative | Independent Owner's Representation",
    description:
      "Independent yacht owner's representation for new builds and refits, 24 to 60 metres. SYBAss accredited, YORR registered, no commissions, no yard affiliations.",
    type: "website",
    url: "https://forelandmarine.com/owners-representation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Owner's Representative | Independent Owner's Representation",
    description:
      "Independent yacht owner's representation for new builds and refits. SYBAss accredited, YORR registered, no commissions.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/owners-representation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
