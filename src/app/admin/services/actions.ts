"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

export async function addService(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");
  const supabase = await getSupabaseServer();
  await supabase.from("fm_services").insert({
    code: String(formData.get("code") || "").trim().toUpperCase(),
    name: String(formData.get("name") || "").trim(),
    unit: String(formData.get("unit") || "day"),
    rate: Number(formData.get("rate")) || 0,
    category: String(formData.get("category") || "").trim() || null,
  });
  revalidatePath("/admin/services");
}

export async function updateService(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");
  const supabase = await getSupabaseServer();
  await supabase
    .from("fm_services")
    .update({
      name: String(formData.get("name") || "").trim(),
      unit: String(formData.get("unit") || "day"),
      rate: Number(formData.get("rate")) || 0,
      category: String(formData.get("category") || "").trim() || null,
      active: formData.get("active") === "on",
    })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/services");
}
