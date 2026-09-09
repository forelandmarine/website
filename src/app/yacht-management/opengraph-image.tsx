import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Independent Yacht Management, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Yacht Management",
    title: "Yacht management that answers to the owner",
    subtitle: "ISM, crew, budgets, insurance, class and flag for sailing and motor yachts. The management fee is our only revenue.",
    url: "forelandmarine.com/yacht-management",
    footnote: "ISM, Crew, Budget, Compliance",
  });
}
