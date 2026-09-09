import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Technical Support for Yachts Over 24m, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Technical Support",
    title: "The team behind your engineering team.",
    subtitle:
      "An annual programme for sailing and motor yachts over 24 metres. Senior engineers on call day and night. From GBP 250 per month.",
    url: "forelandmarine.com/technical-support",
    footnote: "Audit, On Call, Parts Anywhere",
    gradient:
      "linear-gradient(135deg, #040D1A 0%, #081630 50%, #040D1A 100%)",
  });
}
