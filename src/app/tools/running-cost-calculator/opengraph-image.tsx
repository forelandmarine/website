import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Superyacht Running Cost Calculator, Foreland Marine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OgImage() {
  return renderOgCard({
    eyebrow: "Running Costs",
    title: "What does it actually cost to run a superyacht?",
    subtitle: "An operating budget model for owners and managers: crew, insurance, maintenance, berths, fuel, management and compliance.",
    url: "forelandmarine.com/tools/running-cost-calculator",
    footnote: "Budgeting Tool",
  });
}
