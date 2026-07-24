"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

function s(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v.length ? v : null;
}
function n(formData: FormData, key: string): number | null {
  const v = String(formData.get(key) ?? "").trim();
  if (!v) return null;
  const num = Number(v);
  return Number.isFinite(num) ? num : null;
}

export async function createClient(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("fm_clients")
    .insert({
      name: s(formData, "name") || "Unnamed client",
      type: s(formData, "type") || "owner",
      company: s(formData, "company"),
      email: s(formData, "email"),
      phone: s(formData, "phone"),
      country: s(formData, "country"),
      notes: s(formData, "notes"),
      created_by: profile.id,
    })
    .select("id")
    .single();
  revalidatePath("/admin/clients");
  redirect(data ? `/admin/clients/${data.id}` : "/admin/clients");
}

export async function updateClient(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase
    .from("fm_clients")
    .update({
      name: s(formData, "name") || "Unnamed client",
      type: s(formData, "type") || "owner",
      company: s(formData, "company"),
      email: s(formData, "email"),
      phone: s(formData, "phone"),
      country: s(formData, "country"),
      notes: s(formData, "notes"),
    })
    .eq("id", id);
  revalidatePath(`/admin/clients/${id}`);
  redirect(`/admin/clients/${id}`);
}

export async function addVessel(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const clientId = String(formData.get("client_id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_vessels").insert({
    client_id: clientId,
    name: s(formData, "name") || "Unnamed vessel",
    type: s(formData, "type") || "sail",
    builder: s(formData, "builder"),
    year_built: n(formData, "year_built"),
    length_m: n(formData, "length_m"),
    gross_tonnage: n(formData, "gross_tonnage"),
    imo: s(formData, "imo"),
    mmsi: s(formData, "mmsi"),
    flag: s(formData, "flag"),
    home_port: s(formData, "home_port"),
    notes: s(formData, "notes"),
  });
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function deleteVessel(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const clientId = String(formData.get("client_id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_vessels").delete().eq("id", id);
  revalidatePath(`/admin/clients/${clientId}`);
}
