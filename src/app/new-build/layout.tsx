import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Build",
  description:
    "Owner's representation and build management for new yacht projects. Accredited by SYBAss. Foreland Marine.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
