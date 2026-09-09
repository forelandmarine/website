import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Debrief Race Intelligence, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Race Intelligence",
    title: "Every race, read back properly",
    subtitle: "Telemetry and analysis for owner-driver and grand-prix campaigns, turned into decisions for the next start.",
    url: "forelandmarine.com/tools/debrief",
    footnote: "Telemetry, Analysis, Debrief",
  });
}
