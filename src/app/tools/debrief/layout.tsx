import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debrief: Race Intelligence Dashboard",
  description:
    "AI-powered race analysis and crew debrief platform. Combines telemetry, video, weather, AIS tracking, crew positioning and comms into a unified timeline for post-race performance review.",
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
