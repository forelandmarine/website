import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The Owner's Team on a Yacht New Build, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "New Build",
    title: "The team on your side of the table",
    subtitle:
      "Who sits on the owner's team for a new build, who each person answers to, and when they join. Sailing and motor yachts, 24 to 60 metres.",
    url: "forelandmarine.com/owners-representation/owners-team",
    footnote: "SYBAss, YORR, British Marine",
  });
}
