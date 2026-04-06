import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marine Digital Tools & Software",
  description:
    "Foreland Marine digital tools: SeaTime Tracker, Lightship ISM and PMS Database services for professional yacht management.",
  alternates: {
    canonical: "https://forelandmarine.com/tools",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
