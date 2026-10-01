import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getBuilderData } from "@/lib/admin/data";
import { PageHeader, Card, Badge, fmtDate, fmtDateTime } from "@/components/admin/ui";
import { Field, SelectField, TextArea } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { CopyField } from "@/components/admin/CopyField";
import { SurveyWorkspace } from "@/components/admin/SurveyWorkspace";
import type { ChecklistItem } from "@/components/admin/SurveyChecklist";
import { getTemplate, outcomeLabel } from "@/lib/admin/survey-templates";
import { PHOTO_BUCKET } from "@/lib/admin/survey-photos";
import {
  updateSurveyHeader,
  signOffSurvey,
  setSurveyStatus,
  setSurveyShared,
  createFollowUp,
  deleteSurvey,
  type PhotoView,
} from "../actions";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forelandmarine.com";

export default async function SurveyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const [{ data: survey }, { data: items }, { data: photoRows }, { clients, vessels }] = await Promise.all([
    supabase.from("fm_surveys").select("*, fm_clients(id, name), fm_vessels(id, name)").eq("id", id).single(),
    supabase.from("fm_survey_items").select("id, section, label, essential, result, finding, priority, recommendation, custom").eq("survey_id", id).order("sort"),
    supabase.from("fm_survey_photos").select("id, item_id, section, caption, in_report, path, display_path").eq("survey_id", id).order("created_at"),
    getBuilderData(),
  ]);
  if (!survey) notFound();

  // One signing call for every thumbnail and original on the page.
  const rows = photoRows ?? [];
  const paths = rows.flatMap((p) => [p.display_path ?? p.path, p.path]);
  const { data: signed } = paths.length ? await supabase.storage.from(PHOTO_BUCKET).createSignedUrls(paths, 3600) : { data: [] };
  const photos: PhotoView[] = rows.map((p, n) => ({
    id: p.id,
    item_id: p.item_id,
    section: p.section,
    caption: p.caption,
    in_report: p.in_report,
    // Originals a browser cannot show (HEIC without a display copy) get no thumbnail.
    url: p.display_path || !/\.(heic|heif)$/i.test(p.path) ? signed?.[n * 2]?.signedUrl ?? null : null,
    fullUrl: signed?.[n * 2 + 1]?.signedUrl ?? null,
  }));

  const template = getTemplate(survey.template_key);
  const notes = Object.fromEntries((template?.sections ?? []).map((s) => [s.name, s.note]));
  const client = Array.isArray(survey.fm_clients) ? survey.fm_clients[0] : survey.fm_clients;
  const vessel = Array.isArray(survey.fm_vessels) ? survey.fm_vessels[0] : survey.fm_vessels;
  const vesselName = survey.vessel_name || vessel?.name || "Vessel not set";
  const locked = survey.status !== "open";
  const meta = (survey.meta as Record<string, string>) ?? {};
  const clientLink = `${SITE_URL}/s/${survey.public_token}`;

  const reportLinks = (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Link href={`/admin/surveys/${id}/report`} className="inline-flex min-h-10 items-center rounded-md bg-navy px-4 text-sm font-medium text-white hover:bg-navy-700">
          Preview and print
        </Link>
        <a href={`/admin/surveys/${id}/docx`} className="inline-flex min-h-10 items-center rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Download Word document
        </a>
      </div>
      <p className="text-xs text-slate-500">
        The report is built from this page and the checklist. Sections left without text list their findings. The Word document uses the Foreland letterhead and can be edited by hand before issue.
      </p>
    </div>
  );

  const details = (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Survey details</h3>
        <form action={updateSurveyHeader} className="space-y-3">
          <input type="hidden" name="id" value={id} />
          <SelectField label="Client" name="client_id" defaultValue={survey.client_id ?? ""} options={[{ value: "", label: "None" }, ...clients.map((c) => ({ value: c.id, label: c.name }))]} />
          <SelectField label="Vessel on file" name="vessel_id" defaultValue={survey.vessel_id ?? ""} options={[{ value: "", label: "None" }, ...vessels.map((v) => ({ value: v.id, label: v.name }))]} />
          <Field label="Vessel name" name="vessel_name" defaultValue={survey.vessel_name} />
          <SelectField
            label="Vessel type"
            name="vessel_type"
            defaultValue={survey.vessel_type ?? ""}
            options={[{ value: "", label: "Not set" }, { value: "sail", label: "Sailing yacht" }, { value: "motor", label: "Motor yacht" }]}
          />
          <Field label="Location" name="location" defaultValue={survey.location} />
          <Field label="Surveyor" name="surveyor" defaultValue={survey.surveyor} />
          <Field label="Survey date" name="survey_date" type="date" defaultValue={survey.survey_date} />
          {template?.fields.map((f) =>
            f.type === "textarea" ? (
              <TextArea key={f.key} label={f.label} name={`meta_${f.key}`} rows={3} defaultValue={meta[f.key]} />
            ) : (
              <Field key={f.key} label={f.label} name={`meta_${f.key}`} type={f.type === "date" ? "date" : "text"} defaultValue={meta[f.key]} />
            ),
          )}
          <TextArea label="Internal notes" name="notes" rows={3} defaultValue={survey.notes} />
          <PendingButton variant="outline" className="min-h-10">Save details</PendingButton>
        </form>
      </Card>

      <div className="space-y-4">
        <Card className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <Badge>{survey.status}</Badge>
            <span className="text-xs text-slate-400">Updated {fmtDateTime(survey.updated_at)}</span>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Type</dt><dd className="text-right text-slate-700">{template?.title ?? survey.title}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-400">Client</dt><dd className="text-right">{client ? <Link className="text-navy hover:underline" href={`/admin/clients/${client.id}`}>{client.name}</Link> : "—"}</dd></div>
            {survey.status === "signed_off" && (
              <>
                <div className="flex justify-between gap-4"><dt className="text-slate-400">Outcome</dt><dd className="text-right text-slate-700">{outcomeLabel(survey.template_key, survey.outcome)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-400">Valid until</dt><dd className="text-right text-slate-700">{fmtDate(survey.valid_until)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-400">Signed</dt><dd className="text-right text-slate-700">{survey.signed_by || "—"}, {fmtDate(survey.signed_at)}</dd></div>
              </>
            )}
          </dl>
        </Card>

        {survey.status === "open" ? (
          <Card className="p-4 sm:p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Sign-off</h3>
            <form action={signOffSurvey} className="space-y-3">
              <input type="hidden" name="id" value={id} />
              <SelectField label="Outcome" name="outcome" required defaultValue={survey.outcome} options={(template?.outcomes ?? []).map((o) => ({ value: o.value, label: o.label }))} />
              <TextArea label="Conditions" name="conditions" rows={3} defaultValue={survey.conditions} />
              <Field label="Valid until" name="valid_until" type="date" defaultValue={survey.valid_until} />
              <Field label="Surveyor" name="signed_by" required defaultValue={survey.signed_by || survey.surveyor} />
              <PendingButton className="min-h-10">Sign off survey</PendingButton>
            </form>
          </Card>
        ) : (
          <Card className="p-4 sm:p-5">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">Conditions</h3>
            <p className="whitespace-pre-wrap text-sm text-slate-600">{survey.conditions || "None recorded."}</p>
          </Card>
        )}

        <Card className="space-y-3 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-slate-900">Client link</h3>
          {survey.shared ? (
            <>
              <p className="text-xs text-slate-500">Anyone with this link can read and print the report, photographs included.</p>
              <CopyField value={clientLink} />
              <form action={setSurveyShared}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="shared" value="false" />
                <PendingButton variant="outline" className="min-h-10 text-xs">Turn off the link</PendingButton>
              </form>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-500">Off. The report is only visible here until you turn the link on.</p>
              <form action={setSurveyShared}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="shared" value="true" />
                <PendingButton variant="outline" className="min-h-10 text-xs">Create client link</PendingButton>
              </form>
            </>
          )}
        </Card>

        <Card className="space-y-3 p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-slate-900">Next visit and status</h3>
          <form action={createFollowUp}>
            <input type="hidden" name="id" value={id} />
            <PendingButton variant="outline" className="min-h-10 text-xs">Start follow-up visit</PendingButton>
            <p className="mt-1 text-xs text-slate-500">Copies the vessel, particulars and checklist, with open defects carried forward.</p>
          </form>
          <div className="flex flex-wrap gap-2">
            {survey.status !== "open" && (
              <form action={setSurveyStatus}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="status" value="open" />
                <PendingButton variant="outline" className="min-h-10 text-xs">Reopen</PendingButton>
              </form>
            )}
            {survey.status !== "archived" && (
              <form action={setSurveyStatus}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="status" value="archived" />
                <PendingButton variant="outline" className="min-h-10 text-xs">Archive</PendingButton>
              </form>
            )}
          </div>
          <details>
            <summary className="cursor-pointer py-1 text-xs text-red-700">Delete survey</summary>
            <form action={deleteSurvey} className="mt-2">
              <input type="hidden" name="id" value={id} />
              <p className="mb-2 text-xs text-slate-500">This removes the survey, every result and finding, and all its photos.</p>
              <PendingButton variant="danger" className="min-h-10 text-xs">Delete permanently</PendingButton>
            </form>
          </details>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader title={`${survey.number}: ${vesselName}`} subtitle={template?.title ?? survey.title} />
      <div className="px-4 py-4 sm:p-6 lg:p-8">
        {template && <p className="mb-4 text-sm text-slate-600">{template.scope}</p>}
        {locked && (
          <p className="mb-4 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            This survey is {survey.status === "archived" ? "archived" : "signed off"}. Reopen it under Details to make changes.
          </p>
        )}
        <SurveyWorkspace
          surveyId={id}
          items={(items ?? []) as ChecklistItem[]}
          notes={notes}
          gate={template?.gate ?? null}
          style={template?.style ?? "condition"}
          hasValuation={!!template?.valuation}
          locked={locked}
          photos={photos}
          coverId={survey.cover_photo_id}
          report={{
            report_title: survey.report_title,
            intro: survey.intro,
            description: survey.description,
            summary: survey.summary,
            valuation: survey.valuation,
            outstanding: survey.outstanding,
            confidential: survey.confidential,
            narratives: (survey.narratives as Record<string, string>) ?? {},
            particulars: (survey.particulars as [string, string][]) ?? [],
          }}
          reportLinks={reportLinks}
          details={details}
        />
      </div>
    </>
  );
}
