import { PageHeader, Card } from "@/components/admin/ui";
import { Field, FormGrid, SelectField, TextArea } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { getBuilderData } from "@/lib/admin/data";
import { TEMPLATES } from "@/lib/admin/survey-templates";
import { createSurvey } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewSurveyPage() {
  const { clients, vessels } = await getBuilderData();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <PageHeader title="New survey" />
      <div className="p-6 lg:p-8">
        <Card className="max-w-3xl p-6">
          <form action={createSurvey} className="space-y-4">
            <SelectField label="Checklist" name="template_key" required options={TEMPLATES.map((t) => ({ value: t.key, label: t.title }))} />
            <FormGrid>
              <SelectField label="Client" name="client_id" options={[{ value: "", label: "None" }, ...clients.map((c) => ({ value: c.id, label: c.name }))]} />
              <SelectField label="Vessel on file" name="vessel_id" options={[{ value: "", label: "None" }, ...vessels.map((v) => ({ value: v.id, label: v.name }))]} />
              <Field label="Vessel name" name="vessel_name" placeholder="If not on file" />
              <Field label="Location" name="location" />
              <Field label="Surveyor" name="surveyor" />
              <Field label="Survey date" name="survey_date" type="date" defaultValue={today} />
              <Field label="Passage from / to" name="passage" />
              <Field label="Distance and exposure" name="exposure" />
            </FormGrid>
            <TextArea label="Notes" name="notes" rows={3} />
            <PendingButton>Create survey</PendingButton>
          </form>
        </Card>
      </div>
    </>
  );
}
