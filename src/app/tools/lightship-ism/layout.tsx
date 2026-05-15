import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lightship ISM - Yacht Administration & Compliance Platform",
  description:
    "Lightship streamlines yacht administration with ISM compliance, incident reporting, project management, logbooks, and AIS sea service records in one clear interface.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools/lightship-ism",
  },
  keywords: ["yacht ISM compliance", "ISM management system", "yacht safety management", "yacht fleet management", "ISM audit yacht", "yacht compliance platform", "Lightship ISM"],
  openGraph: {
    title: "Lightship ISM - Yacht Administration & Compliance Platform",
    description:
      "Lightship streamlines yacht administration with ISM compliance, incident reporting, project management, logbooks, and AIS sea service records in one clear interface.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
