"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

export async function addExpense(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const net = Number(formData.get("net")) || 0;
  const vat = Number(formData.get("vat")) || 0;
  await supabase.from("fm_expenses").insert({
    supplier: String(formData.get("supplier") || "").trim() || null,
    category: String(formData.get("category") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    currency: String(formData.get("currency") || "gbp"),
    net,
    vat,
    gross: net + vat,
    status: String(formData.get("status") || "paid"),
    spent_on: String(formData.get("spent_on") || "") || new Date().toISOString().slice(0, 10),
    created_by: profile.id,
  });
  revalidatePath("/admin/expenses");
}

export async function deleteExpense(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  await supabase.from("fm_expenses").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/expenses");
}
