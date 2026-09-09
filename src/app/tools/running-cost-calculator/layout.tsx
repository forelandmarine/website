import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "How Much Does It Cost to Run a Superyacht? | Calculator" },
  description:
    "A 40 metre private yacht at moderate use runs about EUR 1.4 to 1.7 million a year, a 50 metre about EUR 1.9 to 2.3 million. Model your own.",
  keywords: [
    "superyacht running costs",
    "how much does it cost to run a superyacht",
    "yacht running costs",
    "superyacht annual costs",
    "yacht operating costs",
    "superyacht cost calculator",
    "yacht cost calculator",
    "10% rule yacht",
    "yacht crew costs",
    "yacht maintenance costs",
    "superyacht ownership costs",
  ],
  alternates: {
    canonical: "https://www.forelandmarine.com/tools/running-cost-calculator",
  },
  openGraph: {
    title: "How Much Does It Cost to Run a Superyacht?",
    description:
      "A 40 metre private yacht at moderate use runs about EUR 1.4 to 1.7 million a year, a 50 metre about EUR 1.9 to 2.3 million. Model your own.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
