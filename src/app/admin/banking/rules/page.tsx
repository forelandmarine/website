import { redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge } from "@/components/admin/ui";
import { Field, SelectField } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { addRule, deleteRule, toggleRule } from "../actions";

export const dynamic = "force-dynamic";

const DIRECTIONS = [
  { value: "out", label: "Money out" },
  { value: "in", label: "Money in" },
  { value: "any", label: "Either" },
];
const ACTIONS = [
  { value: "expense", label: "Create expense" },
  { value: "transfer", label: "Transfer (no P&L)" },
];
const CATEGORIES = ["Travel", "Accommodation", "Subsistence", "Subcontractors", "Software", "Office", "Professional fees", "Insurance", "Marketing", "Equipment", "Bank charges", "Other"];

export default async function RulesPage() {
  const profile = await getCurrentProfile();
  if (!profile || !["owner", "bookkeeper"].includes(profile.role)) redirect("/admin");
  const supabase = await getSupabaseServer();
  const { data: rules } = await supabase.from("fm_bank_rules").select("*").order("priority").order("match_text");

  return (
    <>
      <PageHeader title="Auto-reconcile rules" subtitle="Match transactions to categories and transfers automatically" />
      <div className="p-6 lg:p-8">
        <Card className="mb-6 p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Add a rule</h3>
          <form action={addRule} className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_140px_150px_150px_90px_auto]">
            <Field label="Text contains" name="match_text" placeholder="e.g. anthropic" required />
            <SelectField label="Applies to" name="direction" options={DIRECTIONS} defaultValue="out" />
            <SelectField label="Action" name="action" options={ACTIONS} defaultValue="expense" />
            <SelectField label="Category" name="category" options={CATEGORIES.map((c) => ({ value: c, label: c }))} defaultValue="Software" />
            <Field label="Priority" name="priority" type="number" defaultValue={100} />
            <PendingButton>Add</PendingButton>
          </form>
          <p className="mt-3 text-xs text-slate-400">
            Rules are checked in priority order (low first). Text match is case-insensitive against the counterparty
            and description. Category applies only to expense rules.
          </p>
        </Card>

        <Card className="overflow-x-auto p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="fm-th">Text contains</th>
                <th className="fm-th">Applies to</th>
                <th className="fm-th">Action</th>
                <th className="fm-th">Category</th>
                <th className="fm-th">Priority</th>
                <th className="fm-th">Enabled</th>
                <th className="fm-th"></th>
              </tr>
            </thead>
            <tbody>
              {(rules ?? []).map((r) => (
                <tr key={r.id} className="border-b border-slate-100 last:border-0">
                  <td className="fm-td font-medium text-slate-800">{r.match_text}</td>
                  <td className="fm-td capitalize">{r.direction === "any" ? "Either" : r.direction === "in" ? "Money in" : "Money out"}</td>
                  <td className="fm-td">{r.action === "transfer" ? <Badge tone="slate">transfer</Badge> : <Badge tone="navy">expense</Badge>}</td>
                  <td className="fm-td">{r.category || "—"}</td>
                  <td className="fm-td">{r.priority}</td>
                  <td className="fm-td">
                    <form action={toggleRule} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      <input type="checkbox" name="enabled" defaultChecked={r.enabled} />
                      <PendingButton variant="outline" className="!px-2 !py-1 text-xs">Set</PendingButton>
                    </form>
                  </td>
                  <td className="fm-td text-right">
                    <form action={deleteRule}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="text-slate-300 hover:text-red-600" aria-label="Delete">✕</button>
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
