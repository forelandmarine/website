import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Foreland Marine | Independent Yacht Consultancy" },
  description:
    "An independent yacht consultancy founded by two former J Class senior engineers. YORR registered, working on yachts from 24 to 60 metres.",
  openGraph: {
    title: "About Foreland Marine, Independent Yacht Consultancy",
    description:
      "Meet the team behind Foreland Marine. YORR-registered consultants with blue water experience, specialising in performance sailing yachts from 24 to 60 metres.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
