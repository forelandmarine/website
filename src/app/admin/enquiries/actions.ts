"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";

export async function setEnquiryStatus(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const supabase = await getSupabaseServer();
  await supabase.from("fm_enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/enquiries");
}

// Turns an enquiry into a client record and moves it to "quoting".
export async function convertEnquiryToClient(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const id = String(formData.get("id"));
  const supabase = await getSupabaseServer();

  const { data: enq } = await supabase
    .from("fm_enquiries")
    .select("id, name, email, phone, client_id")
    .eq("id", id)
    .single();
  if (!enq) redirect("/admin/enquiries");

  let clientId = enq.client_id as string | null;
  if (!clientId) {
    const { data: client } = await supabase
      .from("fm_clients")
      .insert({
        name: enq.name || enq.email || "New client",
        email: enq.email,
        phone: enq.phone,
        created_by: profile.id,
      })
      .select("id")
      .single();
    clientId = client?.id ?? null;
    if (clientId) {
      await supabase.from("fm_enquiries").update({ client_id: clientId, status: "quoting" }).eq("id", id);
    }
  }

  if (clientId) redirect(`/admin/clients/${clientId}`);
  redirect("/admin/enquiries");
}
