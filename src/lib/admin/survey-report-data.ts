import type { SupabaseClient } from "@supabase/supabase-js";
import { buildReportModel, type ItemRow, type PhotoRow, type ReportFigure, type ReportModel, type SurveyRow } from "./survey-report";
import { PHOTO_BUCKET } from "./survey-photos";

// Signs every figure's display image (or original) in one call. `storage` must
// be able to read the private bucket: the signed-in user's client in the
// admin, the service-role client behind the client link.
export async function signFigures(storage: SupabaseClient, model: ReportModel): Promise<(f: ReportFigure) => string | null> {
  const figs: ReportFigure[] = [];
  if (model.coverFigure) figs.push(model.coverFigure);
  for (const s of model.sections) for (const b of s.blocks) if (b.kind === "figures") figs.push(...b.figures);
  const paths = figs.map((f) => f.displayPath ?? f.path);
  if (paths.length === 0) return () => null;
  const { data } = await storage.storage.from(PHOTO_BUCKET).createSignedUrls(paths, 3600);
  const byPath = new Map((data ?? []).map((d) => [d.path, d.signedUrl]));
  return (f) => {
    const p = f.displayPath ?? f.path;
    if (!f.displayPath && /\.(heic|heif)$/i.test(p)) return null;
    return byPath.get(p) ?? null;
  };
}

export async function loadReportModel(supabase: SupabaseClient, id: string): Promise<ReportModel | null> {
  const [{ data: survey }, { data: items }, { data: photos }] = await Promise.all([
    supabase.from("fm_surveys").select("*, fm_clients(name), fm_vessels(name)").eq("id", id).single(),
    supabase.from("fm_survey_items").select("id, section, label, essential, result, finding, priority, recommendation").eq("survey_id", id).order("sort"),
    supabase.from("fm_survey_photos").select("id, item_id, section, path, display_path, caption, width, height, in_report, created_at").eq("survey_id", id).order("created_at"),
  ]);
  if (!survey) return null;
  const client = Array.isArray(survey.fm_clients) ? survey.fm_clients[0] : survey.fm_clients;
  const vessel = Array.isArray(survey.fm_vessels) ? survey.fm_vessels[0] : survey.fm_vessels;
  return buildReportModel({
    survey: survey as SurveyRow,
    items: (items ?? []) as ItemRow[],
    photos: (photos ?? []) as PhotoRow[],
    clientName: client?.name ?? null,
    vesselRecordName: vessel?.name ?? null,
  });
}
