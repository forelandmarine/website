import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Foreland Marine Consultancy. Based in Antibes, we provide expert marine consultancy services worldwide.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
