import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getBuilderData } from "@/lib/admin/data";
import { PageHeader, Card, Badge, LinkButton, fmtDate, fmtDateTime } from "@/components/admin/ui";
import { Field, SelectField, TextArea } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { SurveyChecklist, type ChecklistItem } from "@/components/admin/SurveyChecklist";
import { getTemplate, OUTCOMES, outcomeLabel } from "@/lib/admin/survey-templates";
import { updateSurveyHeader, signOffSurvey, setSurveyStatus, deleteSurvey } from "../actions";

export const dynamic = "force-dynamic";

export default async function SurveyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const [{ data: survey }, { data: items }, { clients, vessels }] = await Promise.all([
    supabase.from("fm_surveys").select("*, fm_clients(id, name), fm_vessels(id, name)").eq("id", id).single(),
    supabase.from("fm_survey_items").select("id, section, label, essential, result, finding, custom").eq("survey_id", id).order("sort"),
    getBuilderData(),
  ]);
  if (!survey) notFound();

  const template = getTemplate(survey.template_key);
  const notes = Object.fromEntries((template?.sections ?? []).map((s) => [s.name, s.note]));
  const client = Array.isArray(survey.fm_clients) ? survey.fm_clients[0] : survey.fm_clients;
  const vessel = Array.isArray(survey.fm_vessels) ? survey.fm_vessels[0] : survey.fm_vessels;
  const vesselName = survey.vessel_name || vessel?.name || "Vessel not set";
  const locked = survey.status !== "open";

  return (
    <>
      <PageHeader
        title={`${survey.number}: ${vesselName}`}
        subtitle={survey.title}
        action={
          <div className="flex gap-2">
            <LinkButton href={`/admin/surveys/${id}/report`} variant="outline">Report</LinkButton>
          </div>
        }
      />
      <div className="grid gap-6 p-6 lg:grid-cols-3 lg:p-8">
        <div className="lg:col-span-2">
          {template && <p className="mb-4 text-sm text-slate-600">{template.scope}</p>}
          {locked && (
            <p className="mb-4 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              This survey is {survey.status === "archived" ? "archived" : "signed off"}. Reopen it to change results or findings.
            </p>
          )}
          <SurveyChecklist surveyId={id} items={(items ?? []) as ChecklistItem[]} notes={notes} locked={locked} />
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <Badge>{survey.status}</Badge>
              <span className="text-xs text-slate-400">Updated {fmtDateTime(survey.updated_at)}</span>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Client</dt><dd className="text-right">{client ? <Link className="text-navy hover:underline" href={`/admin/clients/${client.id}`}>{client.name}</Link> : "—"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-400">Survey date</dt><dd className="text-right text-slate-700">{fmtDate(survey.survey_date)}</dd></div>
              {survey.status === "signed_off" && (
                <>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Outcome</dt><dd className="text-right text-slate-700">{outcomeLabel(survey.outcome)}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Valid until</dt><dd className="text-right text-slate-700">{fmtDate(survey.valid_until)}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-slate-400">Signed</dt><dd className="text-right text-slate-700">{survey.signed_by || "—"}, {fmtDate(survey.signed_at)}</dd></div>
                </>
              )}
            </dl>
          </Card>

          <Card className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Survey details</h3>
            <form action={updateSurveyHeader} className="space-y-3">
              <input type="hidden" name="id" value={id} />
              <SelectField label="Client" name="client_id" defaultValue={survey.client_id ?? ""} options={[{ value: "", label: "None" }, ...clients.map((c) => ({ value: c.id, label: c.name }))]} />
              <SelectField label="Vessel on file" name="vessel_id" defaultValue={survey.vessel_id ?? ""} options={[{ value: "", label: "None" }, ...vessels.map((v) => ({ value: v.id, label: v.name }))]} />
              <Field label="Vessel name" name="vessel_name" defaultValue={survey.vessel_name} />
              <Field label="Location" name="location" defaultValue={survey.location} />
              <Field label="Surveyor" name="surveyor" defaultValue={survey.surveyor} />
              <Field label="Survey date" name="survey_date" type="date" defaultValue={survey.survey_date} />
              <Field label="Passage from / to" name="passage" defaultValue={survey.passage} />
              <Field label="Distance and exposure" name="exposure" defaultValue={survey.exposure} />
              <TextArea label="Notes" name="notes" rows={3} defaultValue={survey.notes} />
              <PendingButton variant="outline">Save details</PendingButton>
            </form>
          </Card>

          {survey.status === "open" ? (
            <Card className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Sign-off</h3>
              <form action={signOffSurvey} className="space-y-3">
                <input type="hidden" name="id" value={id} />
                <SelectField label="Outcome" name="outcome" required defaultValue={survey.outcome} options={OUTCOMES.map((o) => ({ value: o.value, label: o.label }))} />
                <TextArea label="Conditions" name="conditions" rows={3} defaultValue={survey.conditions} />
                <Field label="Valid until" name="valid_until" type="date" defaultValue={survey.valid_until} />
                <Field label="Surveyor" name="signed_by" required defaultValue={survey.signed_by || survey.surveyor} />
                <PendingButton>Sign off survey</PendingButton>
              </form>
            </Card>
          ) : (
            <Card className="p-5">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">Conditions</h3>
              <p className="whitespace-pre-wrap text-sm text-slate-600">{survey.conditions || "None recorded."}</p>
            </Card>
          )}

          <Card className="space-y-3 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Status</h3>
            <div className="flex flex-wrap gap-2">
              {survey.status !== "open" && (
                <form action={setSurveyStatus}>
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="status" value="open" />
                  <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Reopen</PendingButton>
                </form>
              )}
              {survey.status !== "archived" && (
                <form action={setSurveyStatus}>
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="status" value="archived" />
                  <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Archive</PendingButton>
                </form>
              )}
            </div>
            <details>
              <summary className="cursor-pointer text-xs text-red-700">Delete survey</summary>
              <form action={deleteSurvey} className="mt-2">
                <input type="hidden" name="id" value={id} />
                <p className="mb-2 text-xs text-slate-500">This removes the survey and every result and finding in it.</p>
                <PendingButton variant="danger" className="!px-3 !py-1.5 text-xs">Delete permanently</PendingButton>
              </form>
            </details>
          </Card>
        </div>
      </div>
    </>
  );
}
