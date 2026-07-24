import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { NotConnected } from "@/components/admin/NotConnected";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentProfile } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// The admin renders as a full-screen light overlay above the site's dark chrome,
// so the public marketing layout (Nav/Footer) is left completely untouched.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <NotConnected />;

  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  return (
    <div className="fm-admin fixed inset-0 z-[60] flex overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar role={profile.role} name={profile.full_name || profile.email || "User"} />
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
