import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { fmtDate } from "@/components/admin/ui";
import { getTemplate, outcomeLabel, resultLabel, summarise } from "@/lib/admin/survey-templates";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

const RESULT_TEXT: Record<string, string> = {
  ok: "text-emerald-700",
  defect: "text-red-700 font-semibold",
  monitor: "text-amber-700 font-medium",
  no_access: "text-slate-600",
};

export default async function SurveyReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const [{ data: survey }, { data: items }] = await Promise.all([
    supabase.from("fm_surveys").select("*, fm_vessels(name)").eq("id", id).single(),
    supabase.from("fm_survey_items").select("section, label, essential, result, finding").eq("survey_id", id).order("sort"),
  ]);
  if (!survey) notFound();

  const list = items ?? [];
  const template = getTemplate(survey.template_key);
  const vessel = Array.isArray(survey.fm_vessels) ? survey.fm_vessels[0] : survey.fm_vessels;
  const sum = summarise(list);
  const sections: string[] = [];
  for (const i of list) if (!sections.includes(i.section)) sections.push(i.section);

  const header: [string, string | null][] = [
    ["Vessel", survey.vessel_name || vessel?.name || null],
    ["Location", survey.location],
    ["Surveyor", survey.surveyor],
    ["Survey date", survey.survey_date ? fmtDate(survey.survey_date) : null],
    ["Passage from / to", survey.passage],
    ["Distance and exposure", survey.exposure],
  ];

  return (
    <div className="fm-survey-report mx-auto w-full max-w-4xl bg-white px-8 py-10 text-slate-900 print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 flex items-start justify-between gap-6 print:hidden">
        <a href={`/admin/surveys/${id}`} className="text-sm text-navy hover:underline">Back to survey</a>
        <PrintButton />
      </div>

      <div className="mb-8 flex items-start justify-between gap-6 border-l-[6px] border-navy pl-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Foreland Marine, {survey.number}</p>
          <h1 className="mt-1 text-2xl font-semibold">{survey.title}</h1>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/foreland-marine-color.png" alt="Foreland Marine" className="h-10 w-auto" />
      </div>

      {template && <p className="mb-6 text-sm leading-relaxed text-slate-700">{template.scope}</p>}

      <table className="mb-8 w-full text-sm">
        <tbody>
          {header.map(([k, v]) => (
            <tr key={k} className="border-b border-slate-200">
              <td className="w-56 py-2 pr-4 text-slate-500">{k}</td>
              <td className="py-2">{v || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mb-8 text-sm text-slate-700">
        {sum.answered} of {sum.total} items checked, including {sum.essentialAnswered} of {sum.essential} essential items.{" "}
        {sum.defects} defect{sum.defects === 1 ? "" : "s"}, {sum.monitor} to monitor and {sum.noAccess} not accessed.
      </p>

      {sections.map((section) => (
        <section key={section} className="mb-8 break-inside-avoid-page">
          <h2 className="mb-2 text-base font-semibold text-navy">{section}</h2>
          {template?.sections.find((s) => s.name === section)?.note && (
            <p className="mb-2 text-sm text-slate-600">{template.sections.find((s) => s.name === section)?.note}</p>
          )}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="w-8 py-1.5">E</th>
                <th className="py-1.5 pr-3">Item</th>
                <th className="w-24 py-1.5 pr-3">Result</th>
                <th className="py-1.5">Finding</th>
              </tr>
            </thead>
            <tbody>
              {list
                .filter((i) => i.section === section)
                .map((i, n) => (
                  <tr key={n} className="break-inside-avoid border-b border-slate-100 align-top">
                    <td className="py-1.5 font-semibold text-navy">{i.essential ? "E" : ""}</td>
                    <td className="py-1.5 pr-3">{i.label}</td>
                    <td className={`py-1.5 pr-3 ${i.result ? RESULT_TEXT[i.result] : "text-slate-400"}`}>{resultLabel(i.result)}</td>
                    <td className="whitespace-pre-wrap py-1.5 text-slate-700">{i.finding || ""}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}

      <section className="break-inside-avoid">
        <h2 className="mb-2 text-base font-semibold text-navy">Sign-off</h2>
        <table className="w-full text-sm">
          <tbody>
            {(
              [
                ["Outcome", survey.status === "signed_off" ? outcomeLabel(survey.outcome) : "Not yet signed off"],
                ["Conditions", survey.conditions],
                ["Valid until", survey.valid_until ? fmtDate(survey.valid_until) : null],
                ["Surveyor", survey.signed_by],
                ["Signed", survey.signed_at ? fmtDate(survey.signed_at) : null],
              ] as [string, string | null][]
            ).map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200 align-top">
                <td className="w-56 py-2 pr-4 text-slate-500">{k}</td>
                <td className="whitespace-pre-wrap py-2">{v || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
