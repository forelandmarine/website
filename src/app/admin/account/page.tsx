import { redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { Field } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function updateName(formData: FormData) {
  "use server";
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const full_name = String(formData.get("full_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim() || null;
  const supabase = await getSupabaseServer();
  await supabase.from("fm_profiles").update({ full_name, phone }).eq("id", profile.id);
  revalidatePath("/admin/account");
}

export default async function AccountPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("fm_profiles").select("full_name, phone").eq("id", profile.id).single();

  return (
    <>
      <PageHeader title="Account" subtitle={profile.email} />
      <div className="p-6 lg:p-8">
        <Card className="max-w-lg p-6">
          <form action={updateName} className="space-y-4">
            <Field label="Full name" name="full_name" defaultValue={data?.full_name} required />
            <Field label="Phone" name="phone" defaultValue={data?.phone} />
            <div className="pt-2">
              <PendingButton>Save</PendingButton>
            </div>
          </form>
          <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
            Role: <span className="capitalize">{profile.role}</span>. To change your password, sign
            out and use the reset link, or ask the owner.
          </p>
        </Card>
      </div>
    </>
  );
}
