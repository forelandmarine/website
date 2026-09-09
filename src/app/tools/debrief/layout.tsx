import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Debrief, Yacht Race Analysis Platform" },
  description:
    "Race analysis for owner-driver and grand-prix campaigns. Telemetry, video, weather, AIS and comms on one timeline for the debrief.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools/debrief",
  },
  keywords: ["yacht race analysis", "sailing race debrief", "race intelligence platform", "yacht performance analysis", "regatta debrief", "race telemetry yacht"],
  openGraph: {
    title: "Debrief, Yacht Race Analysis Platform",
    description:
      "Race analysis for owner-driver and grand-prix campaigns. Telemetry, video, weather, AIS and comms on one timeline for the debrief.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
