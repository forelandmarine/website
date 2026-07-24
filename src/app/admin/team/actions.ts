"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function addMember(formData: FormData): Promise<void> {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");

  const admin = getSupabaseAdmin();
  if (!admin) redirect("/admin/team?error=noservice");

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const full_name = String(formData.get("full_name") || "").trim();
  const role = String(formData.get("role") || "staff");
  const password = String(formData.get("password") || "");

  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name },
  });
  if (error || !created?.user) {
    redirect("/admin/team?error=create");
  }

  await admin.from("fm_profiles").upsert({
    id: created.user.id,
    full_name,
    role,
    active: true,
  });
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function setMember(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");
  const supabase = await getSupabaseServer();
  await supabase
    .from("fm_profiles")
    .update({
      role: String(formData.get("role") || "staff"),
      active: formData.get("active") === "on",
    })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/team");
}
