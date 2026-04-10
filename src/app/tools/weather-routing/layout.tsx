import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marine Weather Routing & Forecasting | OrcaMet Partnership",
  description:
    "Professional weather routing for racing, ocean crossings, and deliveries. Bespoke forecasting and route optimisation in partnership with OrcaMet.",
  alternates: {
    canonical: "https://forelandmarine.com/tools/weather-routing",
  },
  openGraph: {
    title: "Marine Weather Routing & Forecasting | OrcaMet Partnership",
    description:
      "Professional weather routing for racing, ocean crossings, and deliveries. Bespoke forecasting and route optimisation in partnership with OrcaMet.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
