import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Build Owner's Representation & Project Management",
  description:
    "Owner's representation and build management for new yacht projects. Accredited by SYBAss. Foreland Marine.",
  alternates: {
    canonical: "https://forelandmarine.com/new-build",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
