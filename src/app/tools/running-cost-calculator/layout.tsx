import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superyacht Running Cost Calculator | Foreland Marine",
  description:
    "Estimate the annual running costs of a superyacht. Enter yacht length, type, and cruising area to get a detailed breakdown of crew, insurance, maintenance, fuel, marina fees and more.",
  alternates: {
    canonical: "https://forelandmarine.com/tools/running-cost-calculator",
  },
  openGraph: {
    title: "Superyacht Running Cost Calculator | Foreland Marine",
    description:
      "Estimate the annual running costs of a superyacht. Enter yacht length, type, and cruising area to get a detailed breakdown of crew, insurance, maintenance, fuel, marina fees and more.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
