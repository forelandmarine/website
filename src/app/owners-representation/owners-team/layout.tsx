import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Superyacht New Build Owner's Team | Foreland Marine" },
  description:
    "The owner's team for a superyacht new build, 24 to 60 metres: owner's representative, shipbuilding lawyer, family office, technical specialists and crew, and when each is appointed.",
  keywords: [
    "superyacht new build team",
    "yacht new build owner's team",
    "new build yacht consultant",
    "new build yacht management",
    "superyacht new build services",
    "new build superyacht project management",
    "new build yacht crew management",
    "owner's representative new build",
    "owner's representative vs project manager",
    "shipbuilding lawyer superyacht",
    "yacht paint inspector new build",
    "noise and vibration consultant yacht",
    "class and flag compliance new build",
    "family office yacht new build",
  ],
  openGraph: {
    title: "Superyacht New Build Owner's Team | Foreland Marine",
    description:
      "The owner's team for a superyacht new build, 24 to 60 metres: owner's representative, shipbuilding lawyer, family office, technical specialists and crew, and when each is appointed.",
    type: "website",
    url: "https://www.forelandmarine.com/owners-representation/owners-team",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superyacht New Build Owner's Team | Foreland Marine",
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
