import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Tools for Yacht Crews and Managers",
  description:
    "Purpose-built digital products for yacht crews, owners and managers: SeaTime Tracker, Lightship ISM, Debrief, PMS database services and weather routing.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools",
  },
  openGraph: {
    title: "Digital Tools for Yacht Crews and Managers",
    description:
      "Purpose-built digital products for yacht crews, owners and managers: SeaTime Tracker, Lightship ISM, Debrief, PMS database services and weather routing.",
    url: "https://www.forelandmarine.com/tools",
    images: ["/images/og-default.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
