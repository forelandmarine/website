import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Build Owner's Representation & Project Management",
  description:
    "Owner's representation and build management for new yacht projects. Accredited by SYBAss. Foreland Marine.",
  keywords: [
    "yacht owner's representative",
    "new build owner's representation",
    "SYBAss accredited",
    "independent owner's representative",
    "new build project management",
  ],
  openGraph: {
    title: "New Build Owner's Representation & Project Management",
    description:
      "Independent owner's representation for new yacht builds. SYBAss accredited project management from concept through sea trials and delivery.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/new-build",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
