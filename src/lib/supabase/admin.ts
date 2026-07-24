import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

// Service-role client for trusted server code only (inserting website enquiries,
// Stripe webhook writes, adding team members). Bypasses RLS — never import into
// client code. Returns null if the service key isn't configured.
export function getSupabaseAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
