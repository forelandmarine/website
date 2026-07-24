import { getSupabaseServer } from "@/lib/supabase/server";

// Loads the reference data the line-item builder needs: active rate-card
// services, all clients, and all vessels (filtered client-side by client).
export async function getBuilderData() {
  const supabase = await getSupabaseServer();
  const [{ data: services }, { data: clients }, { data: vessels }, { data: settings }] = await Promise.all([
    supabase.from("fm_services").select("code, name, unit, rate").eq("active", true).order("category"),
    supabase.from("fm_clients").select("id, name").order("name"),
    supabase.from("fm_vessels").select("id, client_id, name").order("name"),
    supabase.from("fm_settings").select("*").eq("id", 1).single(),
  ]);
  return {
    services: services ?? [],
    clients: clients ?? [],
    vessels: vessels ?? [],
    settings: settings ?? null,
    defaultVatRate: settings?.vat_registered ? Number(settings.default_vat_rate ?? 20) : 0,
  };
}
