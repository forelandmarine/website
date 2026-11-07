import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "The Owner's Team on a Yacht New Build | Foreland Marine" },
  description:
    "The owner's team for a superyacht new build: owner's representative, lawyers, technical specialists, family office and crew, with reporting lines and appointment by stage.",
  keywords: [
    "owner's team yacht new build",
    "superyacht new build team",
    "yacht new build owner's team",
    "owner's representative",
    "shipbuilding lawyer",
    "paint and coatings inspector",
    "noise and vibration consultant",
    "yacht interior consultant",
    "family office yacht new build",
    "new build captain and chief engineer",
    "yacht new build reporting lines",
  ],
  openGraph: {
    title: "The Owner's Team on a Yacht New Build | Foreland Marine",
    description:
      "The owner's team for a superyacht new build: owner's representative, lawyers, technical specialists, family office and crew, with reporting lines and appointment by stage.",
    type: "website",
    url: "https://www.forelandmarine.com/owners-representation/owners-team",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Owner's Team on a Yacht New Build | Foreland Marine",
    description:
      "The owner's team for a superyacht new build, its reporting lines and the stage at which each member is appointed.",
  },
  alternates: {
    canonical: "https://www.forelandmarine.com/owners-representation/owners-team",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
