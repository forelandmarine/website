import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMS Database Setup & Population Services",
  description:
    "Expert planned maintenance system database setup, licensing, and on-site population. Authorised DeepBlue agents. We also work with IDEA, SeaHub, Aquator and other leading PMS platforms.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools/pms-database",
  },
  keywords: ["yacht PMS database", "planned maintenance system yacht", "DeepBlue PMS", "yacht maintenance software", "PMS setup yacht", "superyacht maintenance system"],
  openGraph: {
    title: "PMS Database Setup & Population Services",
    description:
      "Expert planned maintenance system database setup, licensing, and on-site population. Authorised DeepBlue agents. We also work with IDEA, SeaHub, Aquator and other leading PMS platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
