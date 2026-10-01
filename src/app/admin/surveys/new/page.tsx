import Link from "next/link";
import { PageHeader, Card } from "@/components/admin/ui";
import { Field, FormGrid, SelectField, TextArea } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { getBuilderData } from "@/lib/admin/data";
import { getTemplate, TEMPLATES, type SurveyTemplate } from "@/lib/admin/survey-templates";
import { createSurvey } from "../actions";
import { NewClientFields, SaveVesselToggle } from "@/components/admin/NewClientFields";

export const dynamic = "force-dynamic";

const GROUPS: SurveyTemplate["group"][] = ["Condition", "Specialist", "Build and refit", "Compliance", "Passage"];

const STYLE_NOTE: Record<SurveyTemplate["style"], string> = {
  condition: "Narrative report",
  insurance: "Findings and recommendations report",
  site_visit: "Site visit report",
};

export default async function NewSurveyPage({ searchParams }: { searchParams: Promise<{ type?: string; vessel?: string; client?: string }> }) {
  const sp = await searchParams;
  const template = sp.type ? getTemplate(sp.type) : undefined;

  // Step 1: choose the survey type.
  if (!template) {
    return (
      <>
        <PageHeader title="New survey" subtitle="Choose the type of survey" />
        <div className="space-y-6 px-4 py-4 sm:p-6 lg:p-8">
          {GROUPS.map((g) => {
            const list = TEMPLATES.filter((t) => t.group === g);
            if (!list.length) return null;
            return (
              <section key={g}>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{g}</h2>
                <Card className="divide-y divide-slate-100 p-0">
                  {list.map((t) => {
                    const n = t.sections.reduce((a, s) => a + s.items.length, 0);
                    const qs = new URLSearchParams({ type: t.key, ...(sp.vessel ? { vessel: sp.vessel } : {}), ...(sp.client ? { client: sp.client } : {}) });
                    return (
                      <Link key={t.key} href={`/admin/surveys/new?${qs}`} className="block px-4 py-4 hover:bg-slate-50 active:bg-slate-100 sm:px-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-medium text-navy">{t.title}</span>
                          <span className="text-xs text-slate-400">
                            {STYLE_NOTE[t.style]}, {n} items
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{t.summary}</p>
                      </Link>
                    );
                  })}
                </Card>
              </section>
            );
          })}
        </div>
      </>
    );
  }

  // Step 2: the survey header.
  const { clients, vessels } = await getBuilderData();
  const today = new Date().toISOString().slice(0, 10);
  const hasSailOnly = template.sections.some((s) => s.only);
  return (
    <>
      <PageHeader title={template.title} subtitle={template.summary} />
      <div className="px-4 py-4 sm:p-6 lg:p-8">
        <Card className="max-w-3xl p-4 sm:p-6">
          <form action={createSurvey} className="space-y-4">
            <input type="hidden" name="template_key" value={template.key} />
            <FormGrid>
              <SelectField label="Client" name="client_id" defaultValue={sp.client ?? ""} options={[{ value: "", label: "None" }, ...clients.map((c) => ({ value: c.id, label: c.name }))]} />
              <SelectField label="Vessel on file" name="vessel_id" defaultValue={sp.vessel ?? ""} options={[{ value: "", label: "None" }, ...vessels.map((v) => ({ value: v.id, label: v.name }))]} />
              <Field label="Vessel name" name="vessel_name" placeholder="If not on file, e.g. SY Ganges" />
              <SelectField
                label="Vessel type"
                name="vessel_type"
                defaultValue=""
                options={[
                  { value: "", label: hasSailOnly ? "From the vessel on file" : "Not needed" },
                  { value: "sail", label: "Sailing yacht" },
                  { value: "motor", label: "Motor yacht" },
                ]}
              />
              <Field label="Location" name="location" placeholder="Yard or marina, town, country" />
              <Field label="Surveyor" name="surveyor" defaultValue="Jack MacNally" />
              <Field label="Survey date" name="survey_date" type="date" defaultValue={today} />
              {template.fields
                .filter((f) => f.type !== "textarea")
                .map((f) => (
                  <Field key={f.key} label={f.label} name={`meta_${f.key}`} type={f.type === "date" ? "date" : "text"} />
                ))}
            </FormGrid>
            <NewClientFields />
            <SaveVesselToggle />
            {template.fields
              .filter((f) => f.type === "textarea")
              .map((f) => (
                <TextArea key={f.key} label={f.label} name={`meta_${f.key}`} rows={3} />
              ))}
            <TextArea label="Internal notes" name="notes" rows={2} />
            <div className="flex flex-wrap items-center gap-3">
              <PendingButton className="min-h-11">Create survey</PendingButton>
              <Link href="/admin/surveys/new" className="py-2 text-sm text-slate-500 hover:text-navy">Choose a different type</Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
