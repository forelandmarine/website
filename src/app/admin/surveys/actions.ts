"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import {
  getTemplate,
  templateSections,
  fillPlaceholders,
  PARTICULAR_LABELS,
  RESULTS,
  PRIORITIES,
} from "@/lib/admin/survey-templates";
import { ordinalDate } from "@/lib/admin/survey-report";
import { draftSurveyText, type DraftTarget } from "@/lib/admin/survey-draft";
import { PHOTO_BUCKET } from "@/lib/admin/survey-photos";

function s(fd: FormData, k: string): string | null {
  const v = String(fd.get(k) ?? "").trim();
  return v.length ? v : null;
}

async function requireProfile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

function touch(surveyId: string) {
  revalidatePath(`/admin/surveys/${surveyId}`);
  revalidatePath("/admin/surveys");
}

function metaFrom(fd: FormData, templateKey: string): Record<string, string> {
  const meta: Record<string, string> = {};
  for (const f of getTemplate(templateKey)?.fields ?? []) {
    const v = s(fd, `meta_${f.key}`);
    if (v) meta[f.key] = v;
  }
  return meta;
}

function headerFields(fd: FormData) {
  return {
    client_id: s(fd, "client_id"),
    vessel_id: s(fd, "vessel_id"),
    vessel_name: s(fd, "vessel_name"),
    vessel_type: s(fd, "vessel_type"),
    location: s(fd, "location"),
    surveyor: s(fd, "surveyor"),
    survey_date: s(fd, "survey_date"),
    notes: s(fd, "notes"),
  };
}

// A survey can introduce a client and vessel not yet on file: a filled-in
// "New client" panel creates the client, and "Save vessel to file" creates the
// vessel record under that client.
async function resolveClientAndVessel(fd: FormData, header: ReturnType<typeof headerFields>, profileId: string) {
  const supabase = await getSupabaseServer();
  const newName = s(fd, "new_client_name");
  if (newName) {
    const { data } = await supabase
      .from("fm_clients")
      .insert({
        name: newName,
        type: s(fd, "new_client_type") || "owner",
        company: s(fd, "new_client_company"),
        email: s(fd, "new_client_email"),
        phone: s(fd, "new_client_phone"),
        country: s(fd, "new_client_country"),
        created_by: profileId,
      })
      .select("id")
      .single();
    if (data) header.client_id = data.id;
    revalidatePath("/admin/clients");
  }
  if (!header.vessel_id && header.vessel_name && fd.get("save_vessel") === "on") {
    const { data } = await supabase
      .from("fm_vessels")
      .insert({ client_id: header.client_id, name: header.vessel_name, type: header.vessel_type === "motor" ? "motor" : "sail" })
      .select("id")
      .single();
    if (data) header.vessel_id = data.id;
  }
}

type VesselRec = { name: string; type: string | null; builder: string | null; year_built: number | null; length_m: number | null; gross_tonnage: number | null; flag: string | null; imo: string | null };

function particularsFor(vesselName: string | null, v: VesselRec | null): [string, string][] {
  const known: Record<string, string> = {
    "Vessel name": vesselName ?? "",
    Builder: v?.builder ?? "",
    Year: v?.year_built ? String(v.year_built) : "",
    "Length overall": v?.length_m ? `${v.length_m}m` : "",
    "Gross tonnage": v?.gross_tonnage ? String(v.gross_tonnage) : "",
    Flag: v?.flag ?? "",
    Registration: v?.imo ? `IMO ${v.imo}` : "",
  };
  return PARTICULAR_LABELS.map((l) => [l, known[l] ?? ""]);
}

export async function createSurvey(formData: FormData) {
  const profile = await requireProfile();
  const template = getTemplate(String(formData.get("template_key")));
  if (!template) redirect("/admin/surveys");
  const supabase = await getSupabaseServer();

  const header = headerFields(formData);
  await resolveClientAndVessel(formData, header, profile.id);
  let vessel: VesselRec | null = null;
  if (header.vessel_id) {
    const { data } = await supabase.from("fm_vessels").select("name, type, builder, year_built, length_m, gross_tonnage, flag, imo").eq("id", header.vessel_id).single();
    vessel = data;
    header.vessel_name ||= data?.name ?? null;
    if (!header.vessel_type && (data?.type === "sail" || data?.type === "motor")) header.vessel_type = data.type;
  }
  let clientName: string | null = null;
  if (header.client_id) {
    const { data } = await supabase.from("fm_clients").select("name").eq("id", header.client_id).single();
    clientName = data?.name ?? null;
  }

  const { data: survey } = await supabase
    .from("fm_surveys")
    .insert({
      ...header,
      template_key: template.key,
      title: template.title,
      report_title: template.reportTitle,
      meta: metaFrom(formData, template.key),
      confidential: !!template.confidential,
      particulars: particularsFor(header.vessel_name, vessel),
      intro: fillPlaceholders(template.intro, {
        vessel: header.vessel_name,
        location: header.location,
        date: ordinalDate(header.survey_date),
        client: clientName,
      }),
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (!survey) redirect("/admin/surveys");

  let sort = 0;
  const rows = templateSections(template, header.vessel_type).flatMap((sec) =>
    sec.items.map((it) => ({ survey_id: survey.id, section: sec.name, sort: sort++, label: it.label, essential: !!(it.e && template.gate) })),
  );
  await supabase.from("fm_survey_items").insert(rows);

  revalidatePath("/admin/surveys");
  redirect(`/admin/surveys/${survey.id}`);
}

// A follow-up visit on the same vessel: same type, header and particulars,
// with every item still open (defect, monitor, no access) carried forward and
// its finding kept, so a site visit series reads on from the last report.
export async function createFollowUp(formData: FormData) {
  const profile = await requireProfile();
  const fromId = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  const [{ data: prev }, { data: prevItems }] = await Promise.all([
    supabase.from("fm_surveys").select("*").eq("id", fromId).single(),
    supabase.from("fm_survey_items").select("*").eq("survey_id", fromId).order("sort"),
  ]);
  if (!prev) redirect("/admin/surveys");
  const template = getTemplate(prev.template_key);
  const { data: survey } = await supabase
    .from("fm_surveys")
    .insert({
      template_key: prev.template_key,
      title: prev.title,
      report_title: prev.report_title,
      client_id: prev.client_id,
      vessel_id: prev.vessel_id,
      job_id: prev.job_id,
      vessel_name: prev.vessel_name,
      vessel_type: prev.vessel_type,
      location: prev.location,
      surveyor: prev.surveyor,
      survey_date: new Date().toISOString().slice(0, 10),
      meta: prev.meta,
      particulars: prev.particulars,
      confidential: prev.confidential,
      intro: `This report follows the previous attendance of ${ordinalDate(prev.survey_date)} (${prev.number}).`,
      outstanding: prev.outstanding,
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (!survey) redirect("/admin/surveys");

  const open = new Set(["defect", "monitor", "no_access"]);
  const rows = (prevItems ?? []).map((i, n) => ({
    survey_id: survey.id,
    section: i.section,
    sort: n,
    label: i.label,
    essential: i.essential,
    custom: i.custom,
    result: null,
    finding: open.has(i.result) && i.finding ? `Previous visit: ${i.finding}` : null,
    priority: open.has(i.result) ? i.priority : null,
    recommendation: open.has(i.result) ? i.recommendation : null,
  }));
  if (rows.length === 0 && template) {
    let sort = 0;
    for (const sec of templateSections(template, prev.vessel_type))
      for (const it of sec.items) rows.push({ survey_id: survey.id, section: sec.name, sort: sort++, label: it.label, essential: !!(it.e && template.gate), custom: false, result: null, finding: null, priority: null, recommendation: null });
  }
  await supabase.from("fm_survey_items").insert(rows);
  revalidatePath("/admin/surveys");
  redirect(`/admin/surveys/${survey.id}`);
}

export async function updateSurveyHeader(formData: FormData) {
  const profile = await requireProfile();
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  const { data: sv } = await supabase.from("fm_surveys").select("template_key").eq("id", id).single();
  const header = headerFields(formData);
  await resolveClientAndVessel(formData, header, profile.id);
  await supabase
    .from("fm_surveys")
    .update({ ...header, meta: metaFrom(formData, sv?.template_key ?? ""), updated_at: new Date().toISOString() })
    .eq("id", id);
  touch(id);
}

// Called from the checklist on each result click or when a text field loses focus.
export async function saveSurveyItem(
  id: string,
  surveyId: string,
  patch: { result?: string | null; finding?: string | null; priority?: string | null; recommendation?: string | null },
) {
  await requireProfile();
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if ("result" in patch) {
    if (patch.result !== null && !RESULTS.some((x) => x.value === patch.result)) return { ok: false };
    update.result = patch.result;
  }
  if ("priority" in patch) {
    if (patch.priority !== null && !PRIORITIES.some((x) => x.value === patch.priority)) return { ok: false };
    update.priority = patch.priority;
  }
  if ("finding" in patch) update.finding = patch.finding?.trim() || null;
  if ("recommendation" in patch) update.recommendation = patch.recommendation?.trim() || null;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("fm_survey_items").update(update).eq("id", id).eq("survey_id", surveyId);
  await supabase.from("fm_surveys").update({ updated_at: new Date().toISOString() }).eq("id", surveyId);
  revalidatePath("/admin/surveys");
  return { ok: !error };
}

export async function addSurveyItem(formData: FormData) {
  await requireProfile();
  const surveyId = String(formData.get("survey_id"));
  const section = s(formData, "section");
  const label = s(formData, "label");
  if (!label || !section) return;
  const supabase = await getSupabaseServer();
  // Slot the new item after the last item of its section (or at the end for a
  // new section), shifting later items down.
  const { data: items } = await supabase.from("fm_survey_items").select("id, section, sort").eq("survey_id", surveyId).order("sort");
  const list = items ?? [];
  const inSection = list.filter((i) => i.section === section);
  const at = inSection.length ? Math.max(...inSection.map((i) => i.sort)) + 1 : (list.at(-1)?.sort ?? -1) + 1;
  for (const i of list.filter((i) => i.sort >= at)) await supabase.from("fm_survey_items").update({ sort: i.sort + 1 }).eq("id", i.id);
  await supabase.from("fm_survey_items").insert({
    survey_id: surveyId,
    section,
    sort: at,
    label,
    essential: formData.get("essential") === "on",
    custom: true,
  });
  touch(surveyId);
}

export async function deleteSurveyItem(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const surveyId = String(formData.get("survey_id"));
  const supabase = await getSupabaseServer();
  // Only items added to this survey can be removed; template items stay for the record.
  await supabase.from("fm_survey_items").delete().eq("id", id).eq("survey_id", surveyId).eq("custom", true);
  touch(surveyId);
}

// ── Photos ──────────────────────────────────────────────────────────────────
// The browser uploads straight to the private bucket (RLS limits it to owner
// and staff), then registers the photo here.

export type PhotoView = {
  id: string;
  item_id: string | null;
  section: string | null;
  caption: string | null;
  in_report: boolean;
  url: string | null;
  fullUrl: string | null;
};

export async function registerSurveyPhoto(input: {
  surveyId: string;
  itemId: string | null;
  section: string | null;
  path: string;
  displayPath: string | null;
  width: number | null;
  height: number | null;
}): Promise<PhotoView | null> {
  const profile = await requireProfile();
  if (!input.path.startsWith(`${input.surveyId}/`)) return null;
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("fm_survey_photos")
    .insert({
      survey_id: input.surveyId,
      item_id: input.itemId,
      section: input.section,
      path: input.path,
      display_path: input.displayPath,
      width: input.width,
      height: input.height,
      created_by: profile.id,
    })
    .select("id, item_id, section, caption, in_report, path, display_path")
    .single();
  if (!data) return null;
  const { data: signed } = await supabase.storage.from(PHOTO_BUCKET).createSignedUrls([data.display_path ?? data.path, data.path], 3600);
  revalidatePath(`/admin/surveys/${input.surveyId}`);
  return { ...data, url: signed?.[0]?.signedUrl ?? null, fullUrl: signed?.[1]?.signedUrl ?? null };
}

export async function updateSurveyPhoto(id: string, surveyId: string, patch: { caption?: string | null; in_report?: boolean; section?: string | null }) {
  await requireProfile();
  const update: Record<string, unknown> = {};
  if ("caption" in patch) update.caption = patch.caption?.trim() || null;
  if ("in_report" in patch) update.in_report = !!patch.in_report;
  if ("section" in patch) update.section = patch.section || null;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("fm_survey_photos").update(update).eq("id", id).eq("survey_id", surveyId);
  return { ok: !error };
}

export async function deleteSurveyPhoto(id: string, surveyId: string) {
  await requireProfile();
  const supabase = await getSupabaseServer();
  const { data: p } = await supabase.from("fm_survey_photos").select("path, display_path").eq("id", id).eq("survey_id", surveyId).single();
  if (!p) return { ok: false };
  await supabase.storage.from(PHOTO_BUCKET).remove([p.path, p.display_path].filter(Boolean) as string[]);
  await supabase.from("fm_survey_photos").delete().eq("id", id);
  revalidatePath(`/admin/surveys/${surveyId}`);
  return { ok: true };
}

export async function setCoverPhoto(surveyId: string, photoId: string | null) {
  await requireProfile();
  const supabase = await getSupabaseServer();
  await supabase.from("fm_surveys").update({ cover_photo_id: photoId }).eq("id", surveyId);
  revalidatePath(`/admin/surveys/${surveyId}`);
  return { ok: true };
}

// ── Report text ─────────────────────────────────────────────────────────────

const REPORT_TEXT_FIELDS = ["intro", "description", "summary", "valuation", "outstanding", "report_title"] as const;
export type ReportTextField = (typeof REPORT_TEXT_FIELDS)[number];

export async function saveReportField(surveyId: string, field: ReportTextField, value: string | null) {
  await requireProfile();
  if (!REPORT_TEXT_FIELDS.includes(field)) return { ok: false };
  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("fm_surveys")
    .update({ [field]: value?.trim() || null, updated_at: new Date().toISOString() })
    .eq("id", surveyId);
  return { ok: !error };
}

export async function saveNarrative(surveyId: string, section: string, value: string | null) {
  await requireProfile();
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("fm_surveys").select("narratives").eq("id", surveyId).single();
  const narratives = { ...((data?.narratives as Record<string, string>) ?? {}) };
  if (value?.trim()) narratives[section] = value.trim();
  else delete narratives[section];
  const { error } = await supabase.from("fm_surveys").update({ narratives, updated_at: new Date().toISOString() }).eq("id", surveyId);
  return { ok: !error };
}

export async function saveParticulars(surveyId: string, rows: [string, string][]) {
  await requireProfile();
  const clean = rows.map(([k, v]) => [k.trim(), v.trim()]).filter(([k]) => k) as [string, string][];
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("fm_surveys").update({ particulars: clean }).eq("id", surveyId);
  return { ok: !error };
}

export async function setConfidential(surveyId: string, value: boolean) {
  await requireProfile();
  const supabase = await getSupabaseServer();
  await supabase.from("fm_surveys").update({ confidential: value }).eq("id", surveyId);
  revalidatePath(`/admin/surveys/${surveyId}`);
  return { ok: true };
}

// Drafts report text from the checklist with Claude. The draft is returned to
// the editor for the surveyor to read and change; nothing is saved here.
export async function draftReportText(surveyId: string, target: DraftTarget) {
  await requireProfile();
  try {
    return { ok: true as const, text: await draftSurveyText(surveyId, target) };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Drafting failed" };
  }
}

// ── Sign-off, sharing, status ───────────────────────────────────────────────

export async function signOffSurvey(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase
    .from("fm_surveys")
    .update({
      outcome: s(formData, "outcome"),
      conditions: s(formData, "conditions"),
      valid_until: s(formData, "valid_until"),
      signed_by: s(formData, "signed_by"),
      signed_at: new Date().toISOString(),
      status: "signed_off",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  touch(id);
}

export async function setSurveyShared(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_surveys").update({ shared: formData.get("shared") === "true" }).eq("id", id);
  touch(id);
}

export async function setSurveyStatus(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!["open", "signed_off", "archived"].includes(status)) return;
  const supabase = await getSupabaseServer();
  const patch: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  // Reopening clears the signature so a changed survey is never shown as signed.
  if (status === "open") Object.assign(patch, { signed_at: null });
  await supabase.from("fm_surveys").update(patch).eq("id", id);
  touch(id);
}

export async function deleteSurvey(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  const { data: photos } = await supabase.from("fm_survey_photos").select("path, display_path").eq("survey_id", id);
  const paths = (photos ?? []).flatMap((p) => [p.path, p.display_path]).filter(Boolean) as string[];
  if (paths.length) await supabase.storage.from(PHOTO_BUCKET).remove(paths);
  await supabase.from("fm_surveys").delete().eq("id", id);
  revalidatePath("/admin/surveys");
  redirect("/admin/surveys");
}
