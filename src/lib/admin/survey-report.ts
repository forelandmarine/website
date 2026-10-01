// Builds the report for a survey in one of Foreland's three report formats
// (see ReportStyle). The HTML report, the client link and the Word export all
// render from this model, so the three outputs always say the same thing.

import {
  COMPANY,
  fillPlaceholders,
  getTemplate,
  outcomeLabel,
  priorityLabel,
  resultLabel,
  type ReportStyle,
} from "./survey-templates";

export type SurveyRow = {
  id: string;
  number: string;
  title: string;
  template_key: string;
  report_title: string | null;
  vessel_name: string | null;
  location: string | null;
  surveyor: string | null;
  survey_date: string | null;
  meta: Record<string, string> | null;
  intro: string | null;
  description: string | null;
  particulars: [string, string][] | null;
  narratives: Record<string, string> | null;
  summary: string | null;
  valuation: string | null;
  outstanding: string | null;
  confidential: boolean;
  cover_photo_id: string | null;
  status: string;
  outcome: string | null;
  conditions: string | null;
  valid_until: string | null;
  signed_by: string | null;
  signed_at: string | null;
};

export type ItemRow = {
  id: string;
  section: string;
  label: string;
  essential: boolean;
  result: string | null;
  finding: string | null;
  priority: string | null;
  recommendation: string | null;
};

export type PhotoRow = {
  id: string;
  item_id: string | null;
  section: string | null;
  path: string;
  display_path: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  in_report: boolean;
  created_at: string;
};

export type ReportFigure = {
  n: number;
  caption: string;
  photoId: string;
  path: string;
  displayPath: string | null;
  width: number | null;
  height: number | null;
};

export type ReportBlock =
  | { kind: "para"; text: string }
  | { kind: "bullets"; items: string[] }
  // A single "Recommendation:" line, as in the insurance format.
  | { kind: "recommendation"; text: string }
  // Consecutive figures; renderers set them two to a row.
  | { kind: "figures"; figures: ReportFigure[] }
  | { kind: "particulars"; rows: [string, string][] }
  | { kind: "recommendations"; rows: { area: string; action: string; priority: string }[] }
  | { kind: "signature"; name: string; company: string; date: string };

export type ReportSection = { number: number | null; heading: string; blocks: ReportBlock[] };

export type ReportModel = {
  style: ReportStyle;
  reportTitle: string;
  number: string;
  vesselName: string;
  location: string;
  dateText: string;
  surveyor: string;
  company: string;
  confidential: boolean;
  confidentialityNote: string;
  coverFigure: ReportFigure | null;
  // Shown on the cover beneath the title (condition format shows particulars
  // on the page after the cover).
  particulars: [string, string][];
  sections: ReportSection[];
  closingLine: string | null;
  disclaimer: { heading: string; paragraphs: string[] } | null;
};

export const CONFIDENTIALITY_NOTE =
  "This report contains confidential information and is not to be shared with any third party. It is intended for the vessel owner and their representatives only.";

const CONDITION_DISCLAIMER = [
  "This report is the result of a visual, non-destructive inspection of the vessel {vessel}, carried out without dismantling of components unless otherwise stated. The findings, opinions and recommendations are based on the conditions observed on the date of the survey and on information provided to the surveyor, which is assumed to be accurate and complete.",
  "No warranty, guarantee or representation is made as to the future performance, seaworthiness or condition of the vessel. This report does not constitute a certificate of compliance with the rules of any classification society, regulatory body or flag state, unless explicitly stated. Hidden, latent or inaccessible defects may exist that cannot be found by a visual survey.",
  "The surveyor shall not be held liable for any loss, damage or claim arising from reliance on this report beyond the value of the survey fee paid. The client is advised to carry out the further investigations recommended in this report, which may include haul-out, sea trial, rig inspection or specialist evaluation, before relying on it.",
  "This report is intended solely for the use of the commissioning client and may not be reproduced, copied or distributed without the express written consent of the surveyor.",
];

const INSURANCE_DISCLAIMER = [
  "This report reflects the vessel's apparent condition on the date of survey and should be used in conjunction with professional advice and further inspections as needed. No warranty is given as to the vessel's future condition, and hidden or inaccessible defects may exist that cannot be found by a visual survey.",
  "This report is intended solely for the use of the commissioning client and their underwriters, and may not be reproduced or distributed without the written consent of the surveyor.",
];

export function ordinalDate(d: string | null | undefined): string {
  if (!d) return "";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  const day = date.getUTCDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  return `${day}${suffix} ${month} ${date.getUTCFullYear()}`;
}

function paras(text: string | null | undefined): ReportBlock[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .map((t) => ({ kind: "para" as const, text: t }));
}

function lines(text: string | null | undefined): string[] {
  return (text ?? "")
    .split("\n")
    .map((l) => l.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function sentence(s: string): string {
  const t = s.trim();
  return /[.!?:]$/.test(t) ? t : `${t}.`;
}

// Fallback wording for a section with no narrative written: one bullet per
// finding, then a line listing the items found satisfactory.
function findingBullets(items: ItemRow[]): string[] {
  const out: string[] = [];
  for (const i of items) {
    if (i.finding) out.push(sentence(i.finding));
    else if (i.result === "defect" || i.result === "monitor" || i.result === "no_access") out.push(`${i.label}: ${resultLabel(i.result).toLowerCase()}.`);
  }
  const ok = items.filter((i) => i.result === "ok" && !i.finding).map((i) => i.label.split(":")[0].toLowerCase());
  if (ok.length) out.push(`Inspected and found satisfactory: ${ok.join("; ")}.`);
  return out;
}

export function buildReportModel(input: {
  survey: SurveyRow;
  items: ItemRow[];
  photos: PhotoRow[];
  clientName?: string | null;
  vesselRecordName?: string | null;
}): ReportModel {
  const { survey, items, clientName } = input;
  const template = getTemplate(survey.template_key);
  const style: ReportStyle = template?.style ?? "condition";
  const vesselName = survey.vessel_name || input.vesselRecordName || "the vessel";
  const dateText = ordinalDate(survey.survey_date);
  const fill = (t: string) =>
    fillPlaceholders(t, { vessel: vesselName, location: survey.location, date: dateText, client: clientName ?? null });

  // Figures are numbered in order of appearance, the cover photo first.
  let n = 0;
  const photos = input.photos.filter((p) => p.in_report);
  const fig = (p: PhotoRow, fallback?: string): ReportFigure => ({
    n: ++n,
    caption: p.caption?.trim() || fallback || "",
    photoId: p.id,
    path: p.path,
    displayPath: p.display_path,
    width: p.width,
    height: p.height,
  });
  const cover = photos.find((p) => p.id === survey.cover_photo_id) ?? null;
  const coverFigure = cover && style !== "insurance" ? fig(cover, vesselName) : null;
  const rest = photos.filter((p) => p !== cover || style === "insurance");

  const itemById = new Map(items.map((i) => [i.id, i]));
  const sectionOf = (p: PhotoRow) => (p.item_id ? itemById.get(p.item_id)?.section : null) ?? p.section ?? null;
  const sectionOrder: string[] = [];
  for (const i of items) if (!sectionOrder.includes(i.section)) sectionOrder.push(i.section);

  const sections: ReportSection[] = [];
  let num = 0;
  const push = (heading: string, blocks: ReportBlock[], numbered = true) => {
    if (blocks.length === 0) return;
    sections.push({ number: numbered ? ++num : null, heading, blocks });
  };

  const particulars = (survey.particulars ?? []).filter(([, v]) => v && v.trim()) as [string, string][];
  const unsectioned = rest.filter((p) => !sectionOf(p) || !sectionOrder.includes(sectionOf(p)!));

  // Opening sections
  if (style === "site_visit") {
    // Kraken format: the Update is unnumbered and the next section is 2.
    const blocks = paras(fill(survey.intro ?? ""));
    if (coverFigure) blocks.push({ kind: "figures", figures: [coverFigure] });
    sections.push({ number: null, heading: "Update", blocks });
    num = 1;
  } else if (style === "insurance") {
    push("Purpose and scope", paras(fill(survey.intro ?? "")));
    if (particulars.length) push("Vessel particulars", [{ kind: "particulars", rows: particulars }]);
  } else {
    push("Introduction", paras(fill(survey.intro ?? "")));
    push("Vessel description", paras(survey.description));
  }

  // One report section per checklist section
  for (const name of sectionOrder) {
    const its = items.filter((i) => i.section === name);
    const narrative = survey.narratives?.[name];
    const blocks: ReportBlock[] = [];
    if (narrative?.trim()) blocks.push(...paras(narrative));
    if (style === "insurance" || !narrative?.trim()) {
      const b = findingBullets(its);
      if (b.length) blocks.push({ kind: "bullets", items: b });
    }
    if (style === "insurance") {
      const recs = its.filter((i) => i.recommendation).map((i) => sentence(i.recommendation!));
      if (recs.length) blocks.push({ kind: "recommendation", text: recs.join(" ") });
    }
    const sectionPhotos = rest
      .filter((p) => sectionOf(p) === name)
      .sort((a, b) => {
        const ia = a.item_id ? items.findIndex((i) => i.id === a.item_id) : -1;
        const ib = b.item_id ? items.findIndex((i) => i.id === b.item_id) : -1;
        return ia - ib || a.created_at.localeCompare(b.created_at);
      });
    if (sectionPhotos.length) {
      blocks.push({ kind: "figures", figures: sectionPhotos.map((p) => fig(p, p.item_id ? itemById.get(p.item_id)?.label : undefined)) });
    }
    push(name, blocks);
  }

  if (unsectioned.length) push("Further photographs", [{ kind: "figures", figures: unsectioned.map((p) => fig(p)) }]);

  // Closing sections
  const outcome =
    survey.status === "signed_off" && survey.outcome
      ? [
          `Outcome: ${outcomeLabel(survey.template_key, survey.outcome)}.`,
          survey.conditions ? `Conditions: ${survey.conditions.trim()}` : "",
          survey.valid_until ? `Valid until ${ordinalDate(survey.valid_until)}.` : "",
        ].filter(Boolean)
      : [];
  const signature: ReportBlock = {
    kind: "signature",
    name: survey.signed_by || survey.surveyor || "",
    company: COMPANY,
    date: ordinalDate(survey.signed_at ?? survey.survey_date),
  };
  const recRows = items
    .filter((i) => i.recommendation || (i.priority && i.finding))
    .sort((a, b) => (a.priority ?? "D").localeCompare(b.priority ?? "D"))
    .map((i) => ({ area: i.section, action: sentence(i.recommendation || i.finding || i.label), priority: priorityLabel(i.priority) || "Routine" }));

  if (style === "site_visit") {
    const outstanding = [
      ...lines(survey.outstanding),
      ...items.filter((i) => i.result === "defect" || i.result === "monitor").map((i) => i.recommendation || i.finding || i.label),
    ];
    const blocks: ReportBlock[] = [...paras(survey.summary)];
    if (outstanding.length) {
      blocks.push({ kind: "para", text: "The following items remain outstanding and should be addressed:" });
      blocks.push({ kind: "bullets", items: outstanding });
    }
    outcome.forEach((t) => blocks.push({ kind: "para", text: t }));
    blocks.push({ kind: "para", text: "I remain at your disposal for any further information." }, signature);
    push("Observations", blocks);
  } else if (style === "insurance") {
    if (template?.valuation && survey.valuation) push("Valuation", paras(survey.valuation));
    push("Conclusions", [...paras(survey.summary), ...outcome.map((t) => ({ kind: "para" as const, text: t })), signature]);
    if (recRows.length) push("Summary of recommendations", [{ kind: "recommendations", rows: recRows }]);
  } else {
    if (template?.valuation && survey.valuation) push("Valuation", paras(survey.valuation));
    push("Closing summary", [...paras(survey.summary), ...outcome.map((t) => ({ kind: "para" as const, text: t })), signature]);
    if (recRows.length) push("Summary of recommendations", [{ kind: "recommendations", rows: recRows }]);
  }

  return {
    style,
    reportTitle: survey.report_title || template?.reportTitle || "Survey Report",
    number: survey.number,
    vesselName,
    location: survey.location ?? "",
    dateText,
    surveyor: survey.surveyor ?? "",
    company: COMPANY,
    confidential: survey.confidential || !!template?.confidential,
    confidentialityNote: CONFIDENTIALITY_NOTE,
    coverFigure,
    particulars,
    sections,
    closingLine: null,
    disclaimer:
      style === "site_visit"
        ? null
        : {
            heading: style === "insurance" ? "Limitations" : "Surveyor's disclaimer and limitation of liability",
            paragraphs: (style === "insurance" ? INSURANCE_DISCLAIMER : CONDITION_DISCLAIMER).map(fill),
          },
  };
}
