import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht Technical Consultancy & Performance Engineering",
  description:
    "Expert technical consultancy across yacht racing performance, hydraulic and navigation systems, naval architecture, mechanical installation, and AV/IT automation.",
  alternates: {
    canonical: "https://forelandmarine.com/technical-consultancy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
