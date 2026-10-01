"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { getTemplate, RESULTS } from "@/lib/admin/survey-templates";

function s(fd: FormData, k: string): string | null {
  const v = String(fd.get(k) ?? "").trim();
  return v.length ? v : null;
}

async function requireProfile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

function headerFields(fd: FormData) {
  return {
    client_id: s(fd, "client_id"),
    vessel_id: s(fd, "vessel_id"),
    vessel_name: s(fd, "vessel_name"),
    location: s(fd, "location"),
    surveyor: s(fd, "surveyor"),
    survey_date: s(fd, "survey_date"),
    passage: s(fd, "passage"),
    exposure: s(fd, "exposure"),
    notes: s(fd, "notes"),
  };
}

export async function createSurvey(formData: FormData) {
  const profile = await requireProfile();
  const template = getTemplate(String(formData.get("template_key")));
  if (!template) redirect("/admin/surveys");
  const supabase = await getSupabaseServer();

  const header = headerFields(formData);
  // Fall back to the linked vessel's name so the dashboard always has one to show.
  if (!header.vessel_name && header.vessel_id) {
    const { data: v } = await supabase.from("fm_vessels").select("name").eq("id", header.vessel_id).single();
    header.vessel_name = v?.name ?? null;
  }

  const { data: survey } = await supabase
    .from("fm_surveys")
    .insert({ ...header, template_key: template.key, title: template.title, created_by: profile.id })
    .select("id")
    .single();
  if (!survey) redirect("/admin/surveys");

  let sort = 0;
  const rows = template.sections.flatMap((sec) =>
    sec.items.map((it) => ({ survey_id: survey.id, section: sec.name, sort: sort++, label: it.label, essential: !!it.e })),
  );
  await supabase.from("fm_survey_items").insert(rows);

  revalidatePath("/admin/surveys");
  redirect(`/admin/surveys/${survey.id}`);
}

export async function updateSurveyHeader(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_surveys").update({ ...headerFields(formData), updated_at: new Date().toISOString() }).eq("id", id);
  revalidatePath(`/admin/surveys/${id}`);
  revalidatePath("/admin/surveys");
}

// Called from the checklist on each result click or when a finding loses focus.
export async function saveSurveyItem(id: string, surveyId: string, patch: { result?: string | null; finding?: string | null }) {
  await requireProfile();
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if ("result" in patch) {
    const r = patch.result;
    if (r !== null && !RESULTS.some((x) => x.value === r)) return { ok: false };
    update.result = r;
  }
  if ("finding" in patch) update.finding = patch.finding?.trim() || null;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("fm_survey_items").update(update).eq("id", id).eq("survey_id", surveyId);
  await supabase.from("fm_surveys").update({ updated_at: new Date().toISOString() }).eq("id", surveyId);
  revalidatePath("/admin/surveys");
  return { ok: !error };
}

export async function addSurveyItem(formData: FormData) {
  await requireProfile();
  const surveyId = String(formData.get("survey_id"));
  const section = String(formData.get("section"));
  const label = s(formData, "label");
  if (!label) return;
  const supabase = await getSupabaseServer();
  // Slot the new item after the last item of its section, shifting later sections down.
  const { data: items } = await supabase.from("fm_survey_items").select("id, section, sort").eq("survey_id", surveyId).order("sort");
  const list = items ?? [];
  const lastInSection = list.filter((i) => i.section === section).reduce((m, i) => Math.max(m, i.sort), -1);
  const after = list.filter((i) => i.sort > lastInSection);
  for (const i of after) await supabase.from("fm_survey_items").update({ sort: i.sort + 1 }).eq("id", i.id);
  await supabase.from("fm_survey_items").insert({
    survey_id: surveyId,
    section,
    sort: lastInSection + 1,
    label,
    essential: formData.get("essential") === "on",
    custom: true,
  });
  revalidatePath(`/admin/surveys/${surveyId}`);
}

export async function deleteSurveyItem(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const surveyId = String(formData.get("survey_id"));
  const supabase = await getSupabaseServer();
  // Only items added to this survey can be removed; template items stay for the record.
  await supabase.from("fm_survey_items").delete().eq("id", id).eq("survey_id", surveyId).eq("custom", true);
  revalidatePath(`/admin/surveys/${surveyId}`);
}

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
  revalidatePath(`/admin/surveys/${id}`);
  revalidatePath("/admin/surveys");
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
  revalidatePath(`/admin/surveys/${id}`);
  revalidatePath("/admin/surveys");
}

export async function deleteSurvey(formData: FormData) {
  await requireProfile();
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_surveys").delete().eq("id", id);
  revalidatePath("/admin/surveys");
  redirect("/admin/surveys");
}
