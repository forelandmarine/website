import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Management",
  description:
    "Independent, owner-focused yacht management covering ISM compliance, crew management, financial oversight, insurance, class and flag state requirements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
