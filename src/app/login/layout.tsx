import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.forelandmarine.com/login" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
