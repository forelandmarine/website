"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { parsePayload, computeTotals } from "@/lib/admin/line-items";

export async function createQuote(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();

  const parsed = parsePayload(formData.get("payload"));
  const { subtotal, vat_total, total, items } = computeTotals(parsed.rows);

  const { data: quote } = await supabase
    .from("fm_quotes")
    .insert({
      client_id: parsed.client_id,
      vessel_id: parsed.vessel_id,
      title: String(formData.get("title") || "").trim(),
      currency: parsed.currency,
      vat_treatment: parsed.vat_treatment,
      notes: String(formData.get("notes") || "").trim() || null,
      deposit_percent: Number(formData.get("deposit_percent")) || 0,
      valid_until: String(formData.get("valid_until") || "") || null,
      subtotal,
      vat_total,
      total,
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (quote && items.length) {
    await supabase.from("fm_quote_items").insert(items.map((it) => ({ ...it, quote_id: quote.id })));
  }
  revalidatePath("/admin/quotes");
  redirect(quote ? `/admin/quotes/${quote.id}` : "/admin/quotes");
}

export async function updateQuote(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();

  const parsed = parsePayload(formData.get("payload"));
  if (!parsed.id) redirect("/admin/quotes");
  const { subtotal, vat_total, total, items } = computeTotals(parsed.rows);

  await supabase
    .from("fm_quotes")
    .update({
      client_id: parsed.client_id,
      vessel_id: parsed.vessel_id,
      title: String(formData.get("title") || "").trim(),
      currency: parsed.currency,
      vat_treatment: parsed.vat_treatment,
      notes: String(formData.get("notes") || "").trim() || null,
      deposit_percent: Number(formData.get("deposit_percent")) || 0,
      valid_until: String(formData.get("valid_until") || "") || null,
      subtotal,
      vat_total,
      total,
    })
    .eq("id", parsed.id);

  await supabase.from("fm_quote_items").delete().eq("quote_id", parsed.id);
  if (items.length) {
    await supabase.from("fm_quote_items").insert(items.map((it) => ({ ...it, quote_id: parsed.id })));
  }
  revalidatePath(`/admin/quotes/${parsed.id}`);
  redirect(`/admin/quotes/${parsed.id}`);
}

export async function sendQuote(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase
    .from("fm_quotes")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "draft");
  revalidatePath(`/admin/quotes/${id}`);
}

export async function setQuoteStatus(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const supabase = await getSupabaseServer();
  const patch: Record<string, unknown> = { status };
  if (status === "accepted") patch.accepted_at = new Date().toISOString();
  await supabase.from("fm_quotes").update(patch).eq("id", id);
  revalidatePath(`/admin/quotes/${id}`);
}

// Creates an engagement (job) from an accepted quote.
export async function convertQuoteToJob(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  const { data: q } = await supabase
    .from("fm_quotes")
    .select("id, client_id, vessel_id, title, total, currency")
    .eq("id", id)
    .single();
  if (!q) redirect("/admin/quotes");
  const { data: job } = await supabase
    .from("fm_jobs")
    .insert({
      client_id: q.client_id,
      vessel_id: q.vessel_id,
      quote_id: q.id,
      title: q.title || "New engagement",
      status: "scheduled",
      budget: q.total,
      currency: q.currency,
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (job) redirect(`/admin/jobs/${job.id}`);
  redirect(`/admin/quotes/${id}`);
}

export async function deleteQuote(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_quotes").delete().eq("id", id);
  revalidatePath("/admin/quotes");
  redirect("/admin/quotes");
}
