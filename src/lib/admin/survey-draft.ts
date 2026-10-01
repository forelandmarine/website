import { getSupabaseServer } from "@/lib/supabase/server";
import { getTemplate, resultLabel, priorityLabel } from "./survey-templates";
import { ordinalDate } from "./survey-report";

// Drafts report prose from the checklist with Claude, in the voice of
// Foreland's earlier reports (Ganges, Storm Petrel, the Kraken site visits).
// The surveyor always reads and edits the draft before it goes in the report.

export type DraftTarget =
  | { kind: "section"; section: string }
  | { kind: "intro" }
  | { kind: "description" }
  | { kind: "summary" };

const MODEL = "claude-sonnet-5";

const SYSTEM = `You draft sections of yacht survey and site visit reports for Foreland Marine Consultancy Ltd, written in the third-person voice of the surveyor's own earlier reports.

Voice, taken from those reports:
- British English. Plain, measured, professional. Most sentences 15 to 30 words.
- Observed facts first, in the past tense for what was seen ("The wrapping was found to be generally intact and well secured."), present tense for standing condition ("The installation is clean, well laid out, and shows no signs of leaks").
- Name equipment and makers exactly as given in the findings. Never invent a make, model, figure, date or measurement that is not in the input.
- State limitations plainly where an item was not accessible ("was not visible or accessible at the time of the survey and could not be assessed").
- Recommendations are worded "It is recommended that ..." or "... should be ...", and follow the finding they relate to.
- No em-dashes and no middots. Use commas or full stops.
- No generalisations or maxims ("X is the key to Y"), no rhetorical closers, no sales language, no praise of the yard or owner beyond what the findings support.
- No headings, no bullet points, no markdown. Write paragraphs separated by one blank line.

Examples of the house voice:

"The visible condition of the hull above the waterline appears generally good, with localised areas of cosmetic damage observed, particularly around the bow stem where minor impact or abrasion has likely occurred. No immediate signs of delamination, structural cracking, or osmotic blistering were noted during the survey."

"Standing rigging is constructed from PBO fibre rod with stainless steel terminations. While no immediate damage was visible from deck level, PBO rigging typically has a service life of approximately five years. No documentation of rigging replacement was provided, and based on age, full replacement of all standing rigging is considered necessary prior to any sailing activity."

"The interior was thoroughly checked for water ingress, mould and damp, and was found satisfactory. Interior spaces remain dry, and the protective coverings over joinery and finished surfaces are in place throughout."

"The keel section is, for that reason, an area of mild concern. The repeated bag failures there carry a risk of localised dry spots, porosity or resin starvation in the laminate around the keel, and this area should be inspected thoroughly, inside and out, before the hull is accepted."`;

function clean(text: string): string {
  return text
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s*·\s*/g, ", ")
    .replace(/^#+\s.*$/gm, "")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function draftSurveyText(surveyId: string, target: DraftTarget): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("Drafting is not set up (no API key).");
  const supabase = await getSupabaseServer();
  const [{ data: survey }, { data: items }] = await Promise.all([
    supabase.from("fm_surveys").select("*, fm_vessels(name, type, builder, year_built, length_m), fm_clients(name)").eq("id", surveyId).single(),
    supabase.from("fm_survey_items").select("section, label, result, finding, priority, recommendation").eq("survey_id", surveyId).order("sort"),
  ]);
  if (!survey) throw new Error("Survey not found.");
  const template = getTemplate(survey.template_key);
  const list = items ?? [];

  const itemLine = (i: (typeof list)[number]) =>
    `- ${i.label} | result: ${resultLabel(i.result)}${i.finding ? ` | finding: ${i.finding}` : ""}${
      i.recommendation ? ` | recommendation (${priorityLabel(i.priority) || "Routine"}): ${i.recommendation}` : ""
    }`;
  const particulars = ((survey.particulars as [string, string][]) ?? []).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const meta = Object.entries((survey.meta as Record<string, string>) ?? {})
    .map(([k, v]) => `${template?.fields.find((f) => f.key === k)?.label ?? k}: ${v}`)
    .join("\n");

  const context = [
    `Report type: ${template?.title ?? survey.title} (${survey.report_title ?? template?.reportTitle ?? ""})`,
    `Vessel: ${survey.vessel_name ?? ""}`,
    `Location: ${survey.location ?? ""}`,
    `Date: ${ordinalDate(survey.survey_date)}`,
    meta && `Survey details:\n${meta}`,
    particulars && `Particulars:\n${particulars}`,
    survey.notes && `Surveyor's notes: ${survey.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  let task: string;
  if (target.kind === "section") {
    const its = list.filter((i) => i.section === target.section);
    task = `Write the "${target.section}" section of the report, 1 to 4 paragraphs, from these checklist results. Cover every defect, monitor and no-access item and its recommendation; group satisfactory items briefly. Do not mention items marked "Not checked" unless all are unchecked, in which case say the area was not inspected.\n\n${its.map(itemLine).join("\n")}`;
  } else if (target.kind === "intro") {
    task = `Write the opening section of the report (${template?.style === "site_visit" ? "the Update, starting with what Foreland Marine Consultancy Ltd attended to inspect and the purpose of the visit" : "the introduction: purpose of the survey, conditions on the day such as afloat or ashore, and the limits of the inspection"}). 2 to 4 paragraphs. The current text, which you may improve but must not contradict, is:\n\n${survey.intro ?? "(none)"}\n\nChecklist items not accessed:\n${list.filter((i) => i.result === "no_access").map(itemLine).join("\n") || "(none)"}`;
  } else if (target.kind === "description") {
    task = `Write the vessel description: design, builder, construction, rig and layout, from the particulars and survey details only. 1 to 3 paragraphs. If the information is thin, keep it short rather than padding.`;
  } else {
    const issues = list.filter((i) => i.result === "defect" || i.result === "monitor" || i.result === "no_access" || i.recommendation);
    task = `Write the ${template?.style === "site_visit" ? "Observations" : template?.style === "insurance" ? "Conclusions" : "Closing summary"} of the report, 2 to 4 paragraphs: overall condition, then the key items requiring attention in order of priority. ${survey.outcome ? `The surveyor's outcome is: ${survey.outcome}.` : ""}\n\nItems requiring attention:\n${issues.map(itemLine).join("\n") || "(none)"}\n\nSections inspected: ${[...new Set(list.map((i) => i.section))].join(", ")}`;
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: `${context}\n\n${task}` }],
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Drafting failed (${res.status}).`);
  const data = await res.json();
  const text = (data?.content ?? []).filter((c: { type: string }) => c.type === "text").map((c: { text: string }) => c.text).join("\n");
  return clean(text);
}
