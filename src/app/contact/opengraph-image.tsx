import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Contact",
    title: "Start a conversation",
    subtitle: "Refit, new build, management and technical consultancy for sailing and motor yachts, 24 to 60 metres.",
    url: "forelandmarine.com/contact",
    footnote: "London, Antibes, Palma",
  });
}
