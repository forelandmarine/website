import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Tools for Yacht Crews & Managers | Foreland Marine",
  description:
    "Purpose-built digital products for yacht crews, owners, and managers. SeaTime Tracker, Lightship ISM, Debrief, PMS Database services, and weather routing.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools",
  },
  openGraph: {
    title: "Digital Tools for Yacht Crews & Managers | Foreland Marine",
    description:
      "Purpose-built digital products for yacht crews, owners, and managers. SeaTime Tracker, Lightship ISM, Debrief, PMS Database services, and weather routing.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
