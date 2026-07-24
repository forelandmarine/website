"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { parsePayload, computeTotals } from "@/lib/admin/line-items";

// Recomputes amount_paid + status from succeeded payments. Called after any
// payment change so the invoice status always reflects reality.
async function rollUpInvoice(supabase: Awaited<ReturnType<typeof getSupabaseServer>>, invoiceId: string) {
  const { data: inv } = await supabase.from("fm_invoices").select("total, status").eq("id", invoiceId).single();
  if (!inv) return;
  const { data: pays } = await supabase.from("fm_payments").select("amount").eq("invoice_id", invoiceId).eq("status", "succeeded");
  const paid = (pays ?? []).reduce((s, p) => s + Number(p.amount), 0);
  let status = inv.status as string;
  if (status !== "void") {
    if (paid <= 0) status = status === "draft" ? "draft" : "sent";
    else if (paid < Number(inv.total)) status = "part_paid";
    else status = "paid";
  }
  await supabase.from("fm_invoices").update({ amount_paid: paid, status }).eq("id", invoiceId);
}

export async function createInvoice(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const parsed = parsePayload(formData.get("payload"));
  const { subtotal, vat_total, total, items } = computeTotals(parsed.rows);
  const { data: inv } = await supabase
    .from("fm_invoices")
    .insert({
      client_id: parsed.client_id,
      vessel_id: parsed.vessel_id,
      currency: parsed.currency,
      vat_treatment: parsed.vat_treatment,
      notes: String(formData.get("notes") || "").trim() || null,
      issue_date: String(formData.get("issue_date") || "") || undefined,
      due_date: String(formData.get("due_date") || "") || null,
      subtotal,
      vat_total,
      total,
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (inv && items.length) {
    await supabase.from("fm_invoice_items").insert(items.map((it) => {
      const { service_code: _sc, ...rest } = it;
      void _sc;
      return { ...rest, invoice_id: inv.id };
    }));
  }
  revalidatePath("/admin/invoices");
  redirect(inv ? `/admin/invoices/${inv.id}` : "/admin/invoices");
}

export async function updateInvoice(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const parsed = parsePayload(formData.get("payload"));
  if (!parsed.id) redirect("/admin/invoices");
  const { subtotal, vat_total, total, items } = computeTotals(parsed.rows);
  await supabase
    .from("fm_invoices")
    .update({
      client_id: parsed.client_id,
      vessel_id: parsed.vessel_id,
      currency: parsed.currency,
      vat_treatment: parsed.vat_treatment,
      notes: String(formData.get("notes") || "").trim() || null,
      issue_date: String(formData.get("issue_date") || "") || undefined,
      due_date: String(formData.get("due_date") || "") || null,
      subtotal,
      vat_total,
      total,
    })
    .eq("id", parsed.id);
  await supabase.from("fm_invoice_items").delete().eq("invoice_id", parsed.id);
  if (items.length) {
    await supabase.from("fm_invoice_items").insert(items.map((it) => {
      const { service_code: _sc, ...rest } = it;
      void _sc;
      return { ...rest, invoice_id: parsed.id };
    }));
  }
  await rollUpInvoice(supabase, parsed.id);
  revalidatePath(`/admin/invoices/${parsed.id}`);
  redirect(`/admin/invoices/${parsed.id}`);
}

export async function setInvoiceStatus(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_invoices").update({ status: String(formData.get("status")) }).eq("id", id);
  revalidatePath(`/admin/invoices/${id}`);
}

// Raise an invoice from a quote — full amount or the deposit only.
export async function invoiceFromQuote(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const quoteId = String(formData.get("quote_id"));
  const mode = String(formData.get("mode") || "full"); // full | deposit
  const supabase = await getSupabaseServer();
  const { data: q } = await supabase.from("fm_quotes").select("*").eq("id", quoteId).single();
  if (!q) redirect("/admin/quotes");

  const { data: inv } = await supabase
    .from("fm_invoices")
    .insert({
      client_id: q.client_id,
      vessel_id: q.vessel_id,
      quote_id: q.id,
      currency: q.currency,
      vat_treatment: q.vat_treatment,
      status: "draft",
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (!inv) redirect(`/admin/quotes/${quoteId}`);

  if (mode === "deposit" && Number(q.deposit_percent) > 0) {
    const pct = Number(q.deposit_percent);
    const subtotal = Number(q.subtotal) * (pct / 100);
    const vat = Number(q.vat_total) * (pct / 100);
    await supabase.from("fm_invoice_items").insert({
      invoice_id: inv.id,
      description: `Deposit (${pct}%) — ${q.number}${q.title ? ` · ${q.title}` : ""}`,
      qty: 1,
      unit_price: subtotal,
      vat_rate: subtotal > 0 ? (vat / subtotal) * 100 : 0,
      line_total: subtotal,
      sort: 0,
    });
    await supabase.from("fm_invoices").update({ subtotal, vat_total: vat, total: subtotal + vat }).eq("id", inv.id);
  } else {
    const { data: items } = await supabase.from("fm_quote_items").select("*").eq("quote_id", quoteId).order("sort");
    if (items && items.length) {
      await supabase.from("fm_invoice_items").insert(
        items.map((it, i) => ({
          invoice_id: inv.id,
          description: it.description,
          qty: it.qty,
          unit: it.unit,
          unit_price: it.unit_price,
          vat_rate: it.vat_rate,
          line_total: it.line_total,
          sort: i,
        })),
      );
    }
    await supabase.from("fm_invoices").update({ subtotal: q.subtotal, vat_total: q.vat_total, total: q.total }).eq("id", inv.id);
  }
  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices/${inv.id}`);
}

export async function recordPayment(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const invoiceId = String(formData.get("invoice_id"));
  const supabase = await getSupabaseServer();
  const { data: inv } = await supabase.from("fm_invoices").select("client_id, currency").eq("id", invoiceId).single();
  await supabase.from("fm_payments").insert({
    invoice_id: invoiceId,
    client_id: inv?.client_id ?? null,
    type: String(formData.get("type") || "other"),
    method: String(formData.get("method") || "bank"),
    currency: inv?.currency || "gbp",
    amount: Number(formData.get("amount")) || 0,
    status: "succeeded",
    reference: String(formData.get("reference") || "").trim() || null,
    paid_at: (String(formData.get("paid_at") || "") || new Date().toISOString().slice(0, 10)) + "T00:00:00",
  });
  await rollUpInvoice(supabase, invoiceId);
  revalidatePath(`/admin/invoices/${invoiceId}`);
}

export async function deleteInvoice(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_invoices").delete().eq("id", id);
  revalidatePath("/admin/invoices");
  redirect("/admin/invoices");
}
