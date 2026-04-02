import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refit Project Management",
  description:
    "Refit project management for motor and sailing yachts over 24m. 25 large yacht projects across 7 countries, from high-profile racing programmes to in-depth motor yacht rebuilds.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
