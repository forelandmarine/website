import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Foreland Marine Consultancy. Based in London with consultants across all major yachting hubs worldwide.",
  openGraph: {
    title: "Contact Foreland Marine",
    description:
      "Get in touch with Foreland Marine Consultancy. Based in London with consultants across all major yachting hubs worldwide.",
  },
  alternates: {
    canonical: "https://forelandmarine.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
