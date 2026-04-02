import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SeaTime Tracker: AIS-Powered Sea Time Logbook",
  description:
    "SeaTime Tracker automatically detects and logs your sea time via AIS. No manual entry, no paperwork, fully MCA-compliant.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
