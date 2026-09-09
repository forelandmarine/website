import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Foreland Marine Insights";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Insights",
    title: "Notes from owner-side practice",
    subtitle: "Refit, new build, management, compliance and technical writing for owners of yachts 24 to 60 metres.",
    url: "forelandmarine.com/insights",
    footnote: "Written by Jack MacNally",
  });
}
