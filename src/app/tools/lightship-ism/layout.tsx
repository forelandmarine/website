import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lightship ISM - Yacht Administration & Compliance Platform",
  description:
    "Lightship streamlines yacht administration with ISM compliance, incident reporting, project management, logbooks, and AIS sea service records in one clear interface.",
  alternates: {
    canonical: "https://forelandmarine.com/tools/lightship-ism",
  },
  openGraph: {
    title: "Lightship ISM - Yacht Administration & Compliance Platform",
    description:
      "Lightship streamlines yacht administration with ISM compliance, incident reporting, project management, logbooks, and AIS sea service records in one clear interface.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
