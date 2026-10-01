import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { loadReportModel, signFigures } from "@/lib/admin/survey-report-data";
import { SurveyReportView } from "@/components/SurveyReportView";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

export default async function SurveyReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const model = await loadReportModel(supabase, id);
  if (!model) notFound();
  const url = await signFigures(supabase, model);

  return (
    <div className="min-h-full bg-slate-200 px-2 py-4 sm:px-6 sm:py-8 print:bg-white print:p-0">
      <div className="mx-auto mb-4 flex max-w-[210mm] flex-wrap items-center justify-between gap-2 print:hidden">
        <a href={`/admin/surveys/${id}#report`} className="min-h-10 py-2 text-sm text-navy hover:underline">
          Back to survey
        </a>
        <div className="flex gap-2">
          <a href={`/admin/surveys/${id}/docx`} className="inline-flex min-h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Word
          </a>
          <PrintButton />
        </div>
      </div>
      <SurveyReportView model={model} url={url} />
    </div>
  );
}
