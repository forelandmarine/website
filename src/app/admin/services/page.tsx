import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, money } from "@/components/admin/ui";
import { Field, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { addService, updateService } from "./actions";

export const dynamic = "force-dynamic";

const UNITS = [
  { value: "day", label: "per day" },
  { value: "hour", label: "per hour" },
  { value: "month", label: "per month" },
  { value: "fixed", label: "fixed" },
  { value: "each", label: "each" },
];

export default async function ServicesPage() {
  const supabase = await getSupabaseServer();
  const { data: services } = await supabase.from("fm_services").select("*").order("category").order("name");

  return (
    <>
      <PageHeader title="Rate card" subtitle="Standard rates used by the proposal builder" />
      <div className="p-6 lg:p-8">
        <Card className="mb-6 p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Add a rate</h3>
          <form action={addService}>
            <FormGrid cols={3}>
              <Field label="Code" name="code" placeholder="e.g. SURVEY-DAY" required />
              <Field label="Name" name="name" required />
              <Field label="Category" name="category" />
              <Field label="Rate (£ ex-VAT)" name="rate" type="number" step="0.01" required />
              <SelectField label="Unit" name="unit" options={UNITS} defaultValue="day" />
              <div className="flex items-end"><PendingButton>Add</PendingButton></div>
            </FormGrid>
          </form>
        </Card>

        <div className="space-y-3">
          {(services ?? []).map((s) => (
            <Card key={s.id} className="p-4">
              <form action={updateService} className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[110px_1fr_150px_120px_110px_auto]">
                <input type="hidden" name="id" value={s.id} />
                <div>
                  <span className="fm-label">Code</span>
                  <div className="text-sm font-medium text-slate-700">{s.code}</div>
                </div>
                <Field label="Name" name="name" defaultValue={s.name} />
                <Field label="Category" name="category" defaultValue={s.category} />
                <Field label="Rate" name="rate" type="number" step="0.01" defaultValue={s.rate} />
                <SelectField label="Unit" name="unit" options={UNITS} defaultValue={s.unit} />
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-500">
                    <input type="checkbox" name="active" defaultChecked={s.active} /> Active
                  </label>
                  <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Save</PendingButton>
                </div>
              </form>
              <p className="mt-1 text-xs text-slate-400">{money(s.rate, "gbp")} {s.unit === "fixed" ? "fixed" : `/ ${s.unit}`}</p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
