import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Consultancy",
  description:
    "Expert technical consultancy across yacht racing performance, hydraulic and navigation systems, naval architecture, mechanical installation, and AV/IT automation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
