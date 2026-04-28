import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marine Weather Routing & Forecasting | Foreland Marine",
  description:
    "Professional weather routing for racing, ocean crossings, and deliveries. Bespoke forecasting and route optimisation led by our resident meteorologist Steve Carver.",
  alternates: {
    canonical: "https://forelandmarine.com/tools/weather-routing",
  },
  keywords: ["yacht weather routing", "marine weather routing", "ocean crossing weather", "yacht meteorology", "offshore racing weather", "passage planning weather"],
  openGraph: {
    title: "Marine Weather Routing & Forecasting | Foreland Marine",
    description:
      "Professional weather routing for racing, ocean crossings, and deliveries. Bespoke forecasting and route optimisation led by our resident meteorologist Steve Carver.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
