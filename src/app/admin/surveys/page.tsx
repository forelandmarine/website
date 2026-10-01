import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, LinkButton, StatCard, fmtDate } from "@/components/admin/ui";
import { getTemplate, outcomeLabel, summarise, TEMPLATES } from "@/lib/admin/survey-templates";

export const dynamic = "force-dynamic";

function Progress({ done, total, tone = "navy" }: { done: number; total: number; tone?: "navy" | "amber" }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full ${tone === "navy" ? "bg-navy" : "bg-amber-500"}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs tabular-nums text-slate-500">{done}/{total}</span>
    </div>
  );
}

function StatusBadge({ status, templateKey, outcome }: { status: string; templateKey: string; outcome: string | null }) {
  if (status !== "signed_off") return <Badge>{status}</Badge>;
  const label = outcomeLabel(templateKey, outcome);
  const tone = /not /i.test(label) ? "red" : /subject|condition|claims|open items|snag/i.test(label) ? "amber" : "green";
  return <Badge tone={tone}>{label}</Badge>;
}

export default async function SurveysPage({ searchParams }: { searchParams: Promise<{ show?: string; type?: string }> }) {
  const { show, type } = await searchParams;
  const showArchived = show === "all";
  const supabase = await getSupabaseServer();

  let q = supabase
    .from("fm_surveys")
    .select("id, number, title, template_key, vessel_name, location, survey_date, status, outcome, updated_at, fm_vessels(name), fm_survey_items(essential, result, priority), fm_survey_photos!fm_survey_photos_survey_id_fkey(id)")
    .order("updated_at", { ascending: false });
  if (!showArchived) q = q.neq("status", "archived");
  if (type) q = q.eq("template_key", type);
  const { data: surveys } = await q;

  const rows = (surveys ?? []).map((sv) => {
    const vessel = Array.isArray(sv.fm_vessels) ? sv.fm_vessels[0] : sv.fm_vessels;
    return {
      ...sv,
      vesselName: sv.vessel_name || vessel?.name || "—",
      typeTitle: getTemplate(sv.template_key)?.title ?? sv.title,
      gated: !!getTemplate(sv.template_key)?.gate,
      photoCount: (sv.fm_survey_photos ?? []).length,
      sum: summarise(sv.fm_survey_items ?? []),
    };
  });
  const open = rows.filter((r) => r.status === "open");
  const defects = open.reduce((n, r) => n + r.sum.defects, 0);
  const urgent = open.reduce((n, r) => n + r.sum.urgent, 0);
  const signed = rows.filter((r) => r.status === "signed_off").length;
  const usedTypes = TEMPLATES.filter((t) => (surveys ?? []).some((s) => s.template_key === t.key) || t.key === type);
  const qs = (p: Record<string, string | undefined>) => {
    const u = new URLSearchParams();
    for (const [k, v] of Object.entries({ show, type, ...p })) if (v) u.set(k, v);
    const s = u.toString();
    return s ? `/admin/surveys?${s}` : "/admin/surveys";
  };

  return (
    <>
      <PageHeader title="Surveys" subtitle="Condition, specialist, build and compliance surveys" action={<LinkButton href="/admin/surveys/new">New survey</LinkButton>} />
      <div className="space-y-5 px-4 py-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Open surveys" value={String(open.length)} />
          <StatCard label="Defects open" value={String(defects)} hint="Across open surveys" />
          <StatCard label="Urgent recommendations" value={String(urgent)} hint="Across open surveys" />
          <StatCard label="Signed off" value={String(signed)} />
        </div>

        {usedTypes.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Link href={qs({ type: undefined })} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${!type ? "border-navy bg-navy text-white" : "border-slate-300 bg-white text-slate-600"}`}>
              All types
            </Link>
            {usedTypes.map((t) => (
              <Link key={t.key} href={qs({ type: t.key })} className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${type === t.key ? "border-navy bg-navy text-white" : "border-slate-300 bg-white text-slate-600"}`}>
                {t.title}
              </Link>
            ))}
          </div>
        )}

        {rows.length > 0 ? (
          <>
            {/* Phone: one card per survey */}
            <ul className="space-y-2 md:hidden">
              {rows.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/surveys/${r.id}`} className="block rounded-lg border border-slate-200 bg-white p-4 active:bg-slate-50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">{r.vesselName}</p>
                        <p className="truncate text-xs text-slate-500">{r.typeTitle}</p>
                      </div>
                      <StatusBadge status={r.status} templateKey={r.template_key} outcome={r.outcome} />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                      <span>{r.number}</span>
                      <span>{fmtDate(r.survey_date)}</span>
                      {r.location && <span className="truncate">{r.location}</span>}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <Progress done={r.sum.answered} total={r.sum.total} />
                      <span className="text-xs text-slate-500">
                        {r.sum.defects > 0 && <span className="font-medium text-red-700">{r.sum.defects} defect{r.sum.defects === 1 ? "" : "s"} </span>}
                        {r.photoCount} photo{r.photoCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Tablet and desktop: table */}
            <Card className="hidden overflow-x-auto p-0 md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="fm-th">Number</th>
                    <th className="fm-th">Vessel</th>
                    <th className="fm-th">Type</th>
                    <th className="fm-th">Date</th>
                    <th className="fm-th">Progress</th>
                    <th className="fm-th text-right">Defects</th>
                    <th className="fm-th text-right">Photos</th>
                    <th className="fm-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="fm-td whitespace-nowrap">
                        <Link href={`/admin/surveys/${r.id}`} className="font-medium text-navy hover:underline">{r.number}</Link>
                      </td>
                      <td className="fm-td">
                        <div className="font-medium text-slate-800">{r.vesselName}</div>
                        {r.location && <div className="text-xs text-slate-500">{r.location}</div>}
                      </td>
                      <td className="fm-td text-slate-600">{r.typeTitle}</td>
                      <td className="fm-td whitespace-nowrap text-slate-500">{fmtDate(r.survey_date)}</td>
                      <td className="fm-td">
                        <Progress done={r.sum.answered} total={r.sum.total} />
                        {r.gated && <div className="mt-1"><Progress done={r.sum.essentialAnswered} total={r.sum.essential} tone="amber" /></div>}
                      </td>
                      <td className="fm-td text-right tabular-nums">
                        {r.sum.defects > 0 ? <span className="font-medium text-red-700">{r.sum.defects}</span> : <span className="text-slate-400">0</span>}
                      </td>
                      <td className="fm-td text-right tabular-nums text-slate-500">{r.photoCount}</td>
                      <td className="fm-td"><StatusBadge status={r.status} templateKey={r.template_key} outcome={r.outcome} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        ) : (
          <EmptyState title="No surveys yet" hint="Start one with New survey." />
        )}

        <p className="text-xs">
          <Link href={qs({ show: showArchived ? undefined : "all" })} className="inline-block py-2 text-navy hover:underline">
            {showArchived ? "Hide archived surveys" : "Show archived surveys"}
          </Link>
        </p>
      </div>
    </>
  );
}
