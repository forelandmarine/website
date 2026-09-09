import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Yacht Surveys, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Yacht Surveys",
    title: "Condition and pre-purchase surveys",
    subtitle: "Sub and over 24 metres, sail and motor. Reported to the owner, with the findings priced.",
    url: "forelandmarine.com/technical-consultancy/surveys",
    footnote: "Condition, Pre-purchase, Damage",
  });
}
