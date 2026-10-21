import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Press and published work by Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Press",
    title: "Press and published work",
    subtitle: "Bylined analysis for the superyacht trade press, including The unsecured owner in The Superyacht Report, Issue 230.",
    url: "forelandmarine.com/insights/press",
    footnote: "London, Antibes, Palma",
  });
}
