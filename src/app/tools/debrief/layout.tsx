import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debrief - AI Race Intelligence & Analysis Platform",
  description:
    "AI-powered race analysis and crew debrief platform. Combines telemetry, video, weather, AIS tracking, crew positioning and comms into a unified timeline for post-race performance review.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools/debrief",
  },
  keywords: ["yacht race analysis", "sailing race debrief", "race intelligence platform", "yacht performance analysis", "regatta debrief", "race telemetry yacht"],
  openGraph: {
    title: "Debrief - AI Race Intelligence & Analysis Platform",
    description:
      "AI-powered race analysis and crew debrief platform. Combines telemetry, video, weather, AIS tracking, crew positioning and comms into a unified timeline for post-race performance review.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
