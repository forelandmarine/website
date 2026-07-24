import { redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { Field, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { saveSettings } from "./actions";

export const dynamic = "force-dynamic";

const CURRENCIES = [
  { value: "gbp", label: "GBP" },
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
];

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "owner") redirect("/admin");
  const supabase = await getSupabaseServer();
  const { data: s } = await supabase.from("fm_settings").select("*").eq("id", 1).single();

  return (
    <>
      <PageHeader title="Settings" subtitle="Company details, VAT and invoice defaults" />
      <div className="p-6 lg:p-8">
        {saved && (
          <div className="mb-4 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
            Settings saved.
          </div>
        )}
        <Card className="max-w-2xl p-6">
          <form action={saveSettings} className="space-y-4">
            <Field label="Company name" name="company_name" defaultValue={s?.company_name} required />
            <FormGrid cols={2}>
              <Field label="Company number" name="company_number" defaultValue={s?.company_number} />
              <Field label="VAT number" name="vat_number" defaultValue={s?.vat_number} />
            </FormGrid>
            <Field label="Address" name="address" defaultValue={s?.address} />
            <FormGrid cols={2}>
              <Field label="Phone" name="phone" defaultValue={s?.phone} />
              <Field label="Email" name="email" type="email" defaultValue={s?.email} />
            </FormGrid>
            <FormGrid cols={3}>
              <SelectField label="Default currency" name="default_currency" options={CURRENCIES} defaultValue={s?.default_currency ?? "gbp"} />
              <Field label="Default deposit %" name="default_deposit_percent" type="number" step="0.5" defaultValue={s?.default_deposit_percent} />
              <Field label="Default VAT rate %" name="default_vat_rate" type="number" step="1" defaultValue={s?.default_vat_rate} />
            </FormGrid>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="vat_registered" defaultChecked={s?.vat_registered} />
              VAT registered (adds VAT to new proposal and invoice lines by default)
            </label>
            <div className="pt-2"><PendingButton>Save settings</PendingButton></div>
          </form>
        </Card>
      </div>
    </>
  );
}
