import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMS Database Setup & Population Services",
  description:
    "Expert planned maintenance system database setup, licensing, and on-site population. Authorised DeepBlue agents. We also work with IDEA, SeaHub, Aquator and other leading PMS platforms.",
  alternates: {
    canonical: "https://forelandmarine.com/tools/pms-database",
  },
  openGraph: {
    title: "PMS Database Setup & Population Services",
    description:
      "Expert planned maintenance system database setup, licensing, and on-site population. Authorised DeepBlue agents. We also work with IDEA, SeaHub, Aquator and other leading PMS platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
