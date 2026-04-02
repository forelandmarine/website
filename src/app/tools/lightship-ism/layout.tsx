import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lightship ISM: Fleet Management",
  description:
    "Lightship streamlines your workflow, leaving you more time for the important stuff. ISM compliance, incident reporting, project management, logbooks, and AIS sea service records in one clear interface.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
