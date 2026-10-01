import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { buildReportModel, type ItemRow, type PhotoRow, type SurveyRow } from "@/lib/admin/survey-report";
import { signFigures } from "@/lib/admin/survey-report-data";
import { SurveyReportView } from "@/components/SurveyReportView";
import { PrintButton } from "@/app/admin/surveys/[id]/report/PrintButton";

// Client link to a survey report. The RPC returns nothing unless the survey
// has been shared from the admin; photos are signed with the service role
// only after that check has passed.

export const dynamic = "force-dynamic";
export const preferredRegion = "dub1";
export const metadata: Metadata = {
  title: "Survey Report | Foreland Marine",
  robots: { index: false, follow: false },
};

export default async function SharedSurveyReport({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(token)) notFound();
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.rpc("fm_survey_by_token", { t: token });
  if (error || !data?.survey) notFound();

  const model = buildReportModel({
    survey: data.survey as SurveyRow,
    items: (data.items ?? []) as ItemRow[],
    photos: (data.photos ?? []) as PhotoRow[],
    clientName: data.client?.name ?? null,
    vesselRecordName: data.vessel?.name ?? null,
  });
  const admin = getSupabaseAdmin();
  const url = admin ? await signFigures(admin, model) : () => null;

  return (
    <div className="fm-admin fm-doc-overlay fixed inset-0 z-[70] overflow-y-auto bg-slate-200 px-2 py-4 sm:px-6 sm:py-8 print:static print:overflow-visible print:bg-white print:p-0">
      <div className="mx-auto mb-4 flex max-w-[210mm] justify-end print:hidden">
        <PrintButton />
      </div>
      <SurveyReportView model={model} url={url} />
    </div>
  );
}
