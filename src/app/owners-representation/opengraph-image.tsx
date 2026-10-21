import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Yacht Owner's Representation, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Owner's Representation",
    title: "Independent yacht owner's representation",
    subtitle:
      "New build and refit, 24 to 60 metres. YORR registered, accredited through YORP. No yard commissions, no broker referral fees.",
    url: "forelandmarine.com/owners-representation",
    footnote: "SYBAss, YORR, British Marine",
  });
}
