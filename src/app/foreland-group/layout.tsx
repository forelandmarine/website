import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foreland Group - Shipyard Investment",
  description: "Foreland Shipyard Group investment proposal and documentation portal.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.forelandmarine.com/foreland-group",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
