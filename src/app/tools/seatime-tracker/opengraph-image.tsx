import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "SeaTime Tracker, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "SeaTime Tracker",
    title: "The last logbook you will need",
    subtitle: "AIS-powered sea time recording for yacht crew, with certificate-ready records on iOS and Android.",
    url: "forelandmarine.com/tools/seatime-tracker",
    footnote: "iOS, Android, AIS",
  });
}
