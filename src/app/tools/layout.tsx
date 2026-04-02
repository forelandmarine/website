import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Foreland Marine digital tools: SeaTime Tracker, Lightship ISM and PMS Database services for professional yacht management.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
