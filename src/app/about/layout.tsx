import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Independent Yacht Consultancy",
  description:
    "Foreland Marine Consultancy. Independent yacht consultancy built on blue water experience. SYBAss accredited, specialising in performance sailing yachts from 24 to 60 metres.",
  alternates: {
    canonical: "https://forelandmarine.com/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
