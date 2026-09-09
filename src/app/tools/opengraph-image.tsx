import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Digital Tools for Yacht Crews and Managers, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Tools",
    title: "Built on board, not in a boardroom",
    subtitle: "SeaTime Tracker, Lightship ISM, Debrief, PMS database services, weather routing and the running cost calculator.",
    url: "forelandmarine.com/tools",
    footnote: "Built for yachts",
  });
}
