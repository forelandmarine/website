import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Yacht Technical Consultancy, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Technical Consultancy",
    title: "Six engineering disciplines, one owner-side team",
    subtitle: "Racing and logistics, hydraulics and PLC, navigation and comms, naval architecture, mechanical installation, AV and automation.",
    url: "forelandmarine.com/technical-consultancy",
    footnote: "Engineering, Racing, Systems",
  });
}
