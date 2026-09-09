import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "PMS Database Services, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Planned Maintenance",
    title: "A maintenance database built from your yacht",
    subtitle: "Setup and population of planned maintenance systems from the equipment actually on board, not a generic template.",
    url: "forelandmarine.com/tools/pms-database",
    footnote: "Setup, Population, Handover",
  });
}
