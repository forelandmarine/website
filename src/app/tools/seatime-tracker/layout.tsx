import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIS SeaTime Tracker - Automatic Sea Time Logging App",
  description:
    "Automatic AIS-based sea time logging for professional yacht crew. No manual entry, no paperwork, fully MCA compliant. Track and verify your sea service effortlessly.",
  alternates: {
    canonical: "https://forelandmarine.com/tools/seatime-tracker",
  },
  keywords: ["sea time tracker", "AIS sea time", "yacht logbook app", "MCA sea time", "sea service record", "yacht crew logbook", "automatic sea time logging"],
  openGraph: {
    title: "AIS SeaTime Tracker - Automatic Sea Time Logging App",
    description:
      "Automatic AIS-based sea time logging for professional yacht crew. No manual entry, no paperwork, fully MCA compliant. Track and verify your sea service effortlessly.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
