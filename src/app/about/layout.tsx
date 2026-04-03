import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Foreland Marine Consultancy. Independent yacht consultancy built on blue water experience. SYBAss accredited, specialising in performance sailing yachts from 24 to 60 metres.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
