import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Yacht Weather Routing, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Weather Routing",
    title: "Twice-daily routing for delivery and racing",
    subtitle: "Marine meteorology and routing for offshore passages and race programmes, from GBP 325 per day.",
    url: "forelandmarine.com/tools/weather-routing",
    footnote: "Passage, Racing, Delivery",
  });
}
