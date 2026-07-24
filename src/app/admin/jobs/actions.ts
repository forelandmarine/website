"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

function s(fd: FormData, k: string): string | null {
  const v = String(fd.get(k) ?? "").trim();
  return v.length ? v : null;
}

export async function createJob(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("fm_jobs")
    .insert({
      client_id: s(formData, "client_id"),
      vessel_id: s(formData, "vessel_id"),
      title: s(formData, "title") || "New engagement",
      status: s(formData, "status") || "lead",
      description: s(formData, "description"),
      start_date: s(formData, "start_date"),
      end_date: s(formData, "end_date"),
      budget: formData.get("budget") ? Number(formData.get("budget")) : null,
      currency: s(formData, "currency") || "gbp",
      created_by: profile.id,
    })
    .select("id")
    .single();
  revalidatePath("/admin/jobs");
  redirect(data ? `/admin/jobs/${data.id}` : "/admin/jobs");
}

export async function updateJob(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase
    .from("fm_jobs")
    .update({
      client_id: s(formData, "client_id"),
      vessel_id: s(formData, "vessel_id"),
      title: s(formData, "title") || "New engagement",
      status: s(formData, "status") || "lead",
      description: s(formData, "description"),
      start_date: s(formData, "start_date"),
      end_date: s(formData, "end_date"),
      budget: formData.get("budget") ? Number(formData.get("budget")) : null,
      currency: s(formData, "currency") || "gbp",
    })
    .eq("id", id);
  revalidatePath(`/admin/jobs/${id}`);
  redirect(`/admin/jobs/${id}`);
}

export async function setJobStatus(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_jobs").update({ status: String(formData.get("status")) }).eq("id", id);
  revalidatePath(`/admin/jobs/${id}`);
}

export async function addStage(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const jobId = String(formData.get("job_id"));
  const supabase = await getSupabaseServer();
  const { count } = await supabase.from("fm_job_stages").select("*", { count: "exact", head: true }).eq("job_id", jobId);
  await supabase.from("fm_job_stages").insert({
    job_id: jobId,
    name: s(formData, "name") || "Stage",
    due_date: s(formData, "due_date"),
    amount: formData.get("amount") ? Number(formData.get("amount")) : null,
    sort: count ?? 0,
  });
  revalidatePath(`/admin/jobs/${jobId}`);
}

export async function setStageStatus(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const jobId = String(formData.get("job_id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_job_stages").update({ status: String(formData.get("status")) }).eq("id", id);
  revalidatePath(`/admin/jobs/${jobId}`);
}

export async function deleteStage(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const jobId = String(formData.get("job_id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_job_stages").delete().eq("id", id);
  revalidatePath(`/admin/jobs/${jobId}`);
}
