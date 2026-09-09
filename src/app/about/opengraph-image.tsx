import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "About Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "About",
    title: "Independent, and structured to stay that way",
    subtitle: "Founded by two former J Class senior engineers. No yard affiliations, no broker commissions, no supplier referral fees.",
    url: "forelandmarine.com/about",
    footnote: "SYBAss, YORR, British Marine",
  });
}
