import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up · Technical Support | Foreland Marine",
  description:
    "Sign up to the Foreland technical support programme. Three tiers from £250 per month, monthly billing, thirty days' notice to leave.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://forelandmarine.com/technical-support/sign-up",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
