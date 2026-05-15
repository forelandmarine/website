import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Owner's Representative",
  description:
    "SYBAss-accredited yacht owner's representation for new build and refit oversight. Independent of yards and brokers. Sailing and motor yachts 24 to 60 metres.",
  keywords: [
    "yacht owner's representative",
    "yacht owner's representation",
    "yacht owners representation",
    "superyacht representation",
    "superyacht owner's representation",
    "yacht new build",
    "yacht new build project management",
    "new build owner's representation",
    "new build project management",
    "independent owner's representative",
    "independent yacht new build",
    "performance sailing yacht new build",
    "J Class new build",
    "carbon composite yacht new build",
    "SYBAss accredited",
    "YORR registered",
  ],
  openGraph: {
    title: "Yacht Owner's Representative | Foreland Marine",
    description:
      "SYBAss-accredited yacht owner's representation for new build and refit oversight. Independent of yards and brokers. 24 to 60 metres.",
    type: "website",
    url: "https://www.forelandmarine.com/owners-representation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Owner's Representative | Foreland Marine",
    description:
      "SYBAss-accredited yacht owner's representation for new build and refit. Independent of yards and brokers.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/owners-representation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
