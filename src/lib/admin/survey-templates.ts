// Survey types. A new survey copies its template's items into fm_survey_items,
// so editing a template only affects surveys created afterwards. The template
// data lives in survey-template-data.ts; this file holds the types and helpers.

import { TEMPLATES } from "./survey-template-data";

export { TEMPLATES };

export type ReportStyle =
  // Narrative condition report (the Ganges pre-purchase format): cover photo,
  // particulars, introduction, description, prose sections with figures,
  // closing summary, signature, disclaimer.
  | "condition"
  // Insurance format (Storm Petrel): numbered sections, findings as bullets
  // with a Recommendation line, valuation, conclusions, recommendations table.
  | "insurance"
  // Site visit format (Kraken): confidential cover, unnumbered Update, numbered
  // prose sections with figures, observations, outstanding items, closing line.
  | "site_visit";

export type TemplateField = { key: string; label: string; type?: "text" | "date" | "textarea" };
export type TemplateItem = { label: string; e?: boolean };
export type TemplateSection = {
  name: string;
  note?: string;
  // Sections that only apply to one kind of vessel are left out of the other.
  only?: "sail" | "motor";
  items: TemplateItem[];
};

export type SurveyTemplate = {
  key: string;
  title: string;
  group: "Condition" | "Specialist" | "Build and refit" | "Compliance" | "Passage";
  // One line shown in the survey type picker.
  summary: string;
  // Cover title of the report, e.g. "Survey Report", "Site Visit".
  reportTitle: string;
  style: ReportStyle;
  // Guidance shown above the checklist on screen.
  scope: string;
  // Default report introduction (or purpose and scope). Placeholders:
  // {vessel} {location} {date} {client}. Copied into the survey on creation.
  intro: string;
  // When present, items marked e: true must be cleared before the event named
  // in `label` (e.g. "Before the passage"), and the checklist shows readiness.
  gate?: { label: string; explain: string };
  outcomes: { value: string; label: string }[];
  // Type-specific header fields, stored in fm_surveys.meta.
  fields: TemplateField[];
  valuation?: boolean;
  confidential?: boolean;
  sections: TemplateSection[];
};

export const RESULTS = [
  { value: "ok", label: "OK" },
  { value: "defect", label: "Defect" },
  { value: "monitor", label: "Monitor" },
  { value: "no_access", label: "No access" },
  { value: "n_a", label: "N/A" },
] as const;
export type Result = (typeof RESULTS)[number]["value"];

// Recommendation priority. Labels follow the wording used in Foreland reports.
export const PRIORITIES = [
  { value: "A", label: "Urgent", hint: "Before the vessel is used or moved" },
  { value: "B", label: "Soon", hint: "Within the season or at the next yard period" },
  { value: "C", label: "Routine", hint: "Maintenance or advisory" },
] as const;
export type Priority = (typeof PRIORITIES)[number]["value"];

// Default particulars rows, prefilled from the vessel record where possible.
export const PARTICULAR_LABELS = [
  "Vessel name",
  "Make and model",
  "Builder",
  "Year",
  "Length overall",
  "Length at waterline",
  "Beam",
  "Draft",
  "Gross tonnage",
  "Hull material",
  "Flag",
  "Registration",
  "Class",
  "Main engine",
];

export const COMPANY = "Foreland Marine Consultancy Ltd";

export function getTemplate(key: string): SurveyTemplate | undefined {
  return TEMPLATES.find((t) => t.key === key);
}

export function templateSections(t: SurveyTemplate, vesselType: string | null | undefined): TemplateSection[] {
  return t.sections.filter((s) => !s.only || !vesselType || s.only === vesselType);
}

export function resultLabel(r: string | null | undefined): string {
  return RESULTS.find((x) => x.value === r)?.label ?? "Not checked";
}

export function priorityLabel(p: string | null | undefined): string {
  return PRIORITIES.find((x) => x.value === p)?.label ?? "";
}

export function outcomeLabel(templateKey: string, o: string | null | undefined): string {
  if (!o) return "—";
  return getTemplate(templateKey)?.outcomes.find((x) => x.value === o)?.label ?? o;
}

export function fillPlaceholders(text: string, v: Record<string, string | null | undefined>): string {
  return text.replace(/\{(\w+)\}/g, (_, k) => v[k] || `[${k}]`);
}

// Counts used by the dashboard, the checklist header and the report.
export type ItemLite = { essential: boolean; result: string | null; priority?: string | null };

export function summarise(items: ItemLite[]) {
  const ess = items.filter((i) => i.essential);
  return {
    total: items.length,
    answered: items.filter((i) => i.result).length,
    essential: ess.length,
    essentialAnswered: ess.filter((i) => i.result).length,
    // An essential item blocks while it is unchecked, a defect, or not accessed.
    essentialBlocking: ess.filter((i) => !i.result || i.result === "defect" || i.result === "no_access").length,
    defects: items.filter((i) => i.result === "defect").length,
    monitor: items.filter((i) => i.result === "monitor").length,
    noAccess: items.filter((i) => i.result === "no_access").length,
    urgent: items.filter((i) => i.priority === "A").length,
  };
}
