import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marine Industry Insights & Expert Guidance",
  description:
    "Expert insights on yacht management, new build oversight, refit project management, ISM compliance and marine industry best practices from Foreland Marine.",
  alternates: {
    canonical: "https://forelandmarine.com/insights",
  },
  openGraph: {
    title: "Insights | Foreland Marine",
    description:
      "Expert insights on yacht management, new build oversight, refit project management, ISM compliance and marine industry best practices.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
