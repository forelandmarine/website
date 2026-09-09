import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Lightship ISM, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Lightship ISM",
    title: "Safety management that crews actually use",
    subtitle: "Drills, checklists, logs and audit trail for yachts running a voluntary or full ISM system.",
    url: "forelandmarine.com/tools/lightship-ism",
    footnote: "ISM, Drills, Audit",
  });
}
