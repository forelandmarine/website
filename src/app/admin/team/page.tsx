import { redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, fmtDate } from "@/components/admin/ui";
import { Field, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { addMember, setMember } from "./actions";

export const dynamic = "force-dynamic";

const ROLES = [
  { value: "owner", label: "Owner" },
  { value: "staff", label: "Staff" },
  { value: "bookkeeper", label: "Bookkeeper" },
];

export default async function TeamPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");

  const supabase = await getSupabaseServer();
  const { data: members } = await supabase.from("fm_profiles").select("*").order("created_at");
  const serviceReady = Boolean(getSupabaseAdmin());

  return (
    <>
      <PageHeader title="Team" subtitle="People with access to operations" />
      <div className="p-6 lg:p-8">
        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error === "noservice"
              ? "The service-role key is not configured, so new members can't be created here yet."
              : "Could not create that member. The email may already exist."}
          </div>
        )}

        <Card className="mb-6 p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Add a member</h3>
          {serviceReady ? (
            <form action={addMember}>
              <FormGrid cols={2}>
                <Field label="Full name" name="full_name" required />
                <Field label="Email" name="email" type="email" required />
                <SelectField label="Role" name="role" options={ROLES} defaultValue="staff" />
                <Field label="Temporary password" name="password" required />
              </FormGrid>
              <div className="mt-3"><PendingButton>Create member</PendingButton></div>
            </form>
          ) : (
            <p className="text-sm text-slate-500">Set SUPABASE_SERVICE_ROLE_KEY to add members from here.</p>
          )}
        </Card>

        <Card className="overflow-x-auto p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="fm-th">Name</th>
                <th className="fm-th">Role</th>
                <th className="fm-th">Status</th>
                <th className="fm-th">Added</th>
                <th className="fm-th"></th>
              </tr>
            </thead>
            <tbody>
              {(members ?? []).map((m) => (
                <tr key={m.id} className="border-b border-slate-100 last:border-0">
                  <td className="fm-td font-medium text-slate-800">{m.full_name || "—"}</td>
                  <td className="fm-td capitalize">{m.role}</td>
                  <td className="fm-td">{m.active ? <Badge tone="green">active</Badge> : <Badge tone="slate">inactive</Badge>}</td>
                  <td className="fm-td text-slate-500">{fmtDate(m.created_at)}</td>
                  <td className="fm-td">
                    <form action={setMember} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={m.id} />
                      <select name="role" defaultValue={m.role} className="fm-fld !py-1.5 text-xs !w-auto">
                        {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                      </select>
                      <label className="flex items-center gap-1 text-xs text-slate-500">
                        <input type="checkbox" name="active" defaultChecked={m.active} /> Active
                      </label>
                      <PendingButton variant="outline" className="!px-2 !py-1.5 text-xs">Save</PendingButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
