import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

// Server client for RSCs and route handlers. Reads/writes the auth cookies.
export async function getSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // called from a Server Component — safe to ignore, middleware refreshes
        }
      },
    },
  });
}

export type OpsRole = "owner" | "staff" | "bookkeeper";

export type OpsProfile = {
  id: string;
  full_name: string;
  role: OpsRole;
  active: boolean;
  email?: string;
};

// Returns the signed-in Foreland staff profile (id, role, name) or null.
// Wrapped in React cache() so the layout and page in one render share a single
// auth validation + profile query instead of repeating it.
export const getCurrentProfile = cache(async function getCurrentProfile(): Promise<OpsProfile | null> {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("fm_profiles")
    .select("id, full_name, role, active")
    .eq("id", user.id)
    .single();
  if (!profile || !profile.active) return null;
  return { ...profile, email: user.email } as OpsProfile;
});
