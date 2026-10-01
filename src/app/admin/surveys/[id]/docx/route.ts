import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { buildReportModel, type ItemRow, type PhotoRow, type SurveyRow } from "@/lib/admin/survey-report";
import { buildSurveyDocx, imageInfo } from "@/lib/admin/survey-docx";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const preferredRegion = "dub1";

const BUCKET = "fm-survey-photos";

// Downloads the survey report as a Word document built on the Foreland letterhead.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getCurrentProfile();
  if (!profile) return new Response("Unauthorised", { status: 401 });

  const { id } = await params;
  const supabase = await getSupabaseServer();
  const [{ data: survey }, { data: items }, { data: photos }] = await Promise.all([
    supabase.from("fm_surveys").select("*, fm_clients(name), fm_vessels(name)").eq("id", id).single(),
    supabase.from("fm_survey_items").select("*").eq("survey_id", id).order("sort"),
    supabase.from("fm_survey_photos").select("*").eq("survey_id", id).order("created_at"),
  ]);
  if (!survey) return new Response("Not found", { status: 404 });

  const client = Array.isArray(survey.fm_clients) ? survey.fm_clients[0] : survey.fm_clients;
  const vessel = Array.isArray(survey.fm_vessels) ? survey.fm_vessels[0] : survey.fm_vessels;
  const model = buildReportModel({
    survey: survey as SurveyRow,
    items: (items ?? []) as ItemRow[],
    photos: (photos ?? []) as PhotoRow[],
    clientName: client?.name ?? null,
    vesselRecordName: vessel?.name ?? null,
  });

  const bytes = await buildSurveyDocx(model, async (fig) => {
    // Display copies are JPEG with the orientation baked in; originals may be HEIC.
    for (const p of [fig.displayPath, fig.path]) {
      if (!p) continue;
      const { data } = await supabase.storage.from(BUCKET).download(p);
      if (!data) continue;
      const buf = new Uint8Array(await data.arrayBuffer());
      const info = imageInfo(buf);
      if (!info) continue;
      const width = fig.width && fig.height ? fig.width : info.width;
      const height = fig.width && fig.height ? fig.height : info.height;
      return { data: buf, width, height, ext: info.ext };
    }
    return null;
  });

  const filename = `${model.reportTitle} - ${model.vesselName}.docx`.replace(/[\\/:*?"<>|\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename.replace(/[^\x20-\x7e]/g, "_")}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "no-store",
    },
  });
}
