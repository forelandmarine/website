import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The Owner's Team on a Yacht New Build, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "New Build",
    title: "The owner's team for a yacht new build",
    subtitle:
      "The composition of the owner's team for a new build, the reporting line of each member and the stage at which each is appointed. Sailing and motor yachts, 24 to 60 metres.",
    url: "forelandmarine.com/owners-representation/owners-team",
    footnote: "SYBAss, YORR, British Marine",
  });
}
