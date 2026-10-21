import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Yacht Refit Project Management, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Refit",
    title: "Owner-side refit project management",
    subtitle: "Specification, tendering, yard selection and on-site management for yachts 24 to 60 metres. Independent of the yard.",
    url: "forelandmarine.com/refit",
    footnote: "Specification, Tender, Site, Handover",
  });
}
