"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

export async function saveSettings(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");
  const supabase = await getSupabaseServer();
  await supabase.from("fm_settings").update({
    company_name: String(formData.get("company_name") || "").trim(),
    company_number: String(formData.get("company_number") || "").trim() || null,
    vat_registered: formData.get("vat_registered") === "on",
    vat_number: String(formData.get("vat_number") || "").trim() || null,
    address: String(formData.get("address") || "").trim() || null,
    phone: String(formData.get("phone") || "").trim() || null,
    email: String(formData.get("email") || "").trim() || null,
    default_currency: String(formData.get("default_currency") || "gbp"),
    default_deposit_percent: Number(formData.get("default_deposit_percent")) || 0,
    default_vat_rate: Number(formData.get("default_vat_rate")) || 0,
  }).eq("id", 1);
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
