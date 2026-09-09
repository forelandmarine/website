import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "PMS Database Setup for Yachts | Foreland Marine" },
  description:
    "Planned maintenance system setup, licensing and on-site population. Authorised DeepBlue agents, also working with IDEA, SeaHub and Aquator.",
  alternates: {
    canonical: "https://www.forelandmarine.com/tools/pms-database",
  },
  keywords: ["yacht PMS database", "planned maintenance system yacht", "DeepBlue PMS", "yacht maintenance software", "PMS setup yacht", "superyacht maintenance system"],
  openGraph: {
    title: "PMS Database Setup for Yachts",
    description:
      "Planned maintenance system setup, licensing and on-site population. Authorised DeepBlue agents, also working with IDEA, SeaHub and Aquator.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
