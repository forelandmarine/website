"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

export async function addEvent(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const date = String(formData.get("date") || "");
  const time = String(formData.get("time") || "");
  const allDay = !time;
  const startAt = allDay ? `${date}T00:00:00` : `${date}T${time}:00`;
  await supabase.from("fm_events").insert({
    title: String(formData.get("title") || "Event").trim(),
    type: String(formData.get("type") || "engagement"),
    job_id: String(formData.get("job_id") || "") || null,
    start_at: startAt,
    all_day: allDay,
    location: String(formData.get("location") || "").trim() || null,
    notes: String(formData.get("notes") || "").trim() || null,
    created_by: profile.id,
  });
  revalidatePath("/admin/calendar");
}

export async function deleteEvent(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  await supabase.from("fm_events").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/calendar");
}
