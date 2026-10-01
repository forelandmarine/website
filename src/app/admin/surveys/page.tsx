import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, LinkButton, StatCard, fmtDate } from "@/components/admin/ui";
import { outcomeLabel, summarise } from "@/lib/admin/survey-templates";

export const dynamic = "force-dynamic";

function Progress({ done, total, tone = "navy" }: { done: number; total: number; tone?: "navy" | "amber" }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full ${tone === "navy" ? "bg-navy" : "bg-amber-500"}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs tabular-nums text-slate-500">{done}/{total}</span>
    </div>
  );
}

export default async function SurveysPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { show } = await searchParams;
  const showArchived = show === "all";
  const supabase = await getSupabaseServer();

  let q = supabase
    .from("fm_surveys")
    .select("id, number, title, vessel_name, location, surveyor, survey_date, status, outcome, updated_at, fm_vessels(name), fm_survey_items(essential, result)")
    .order("updated_at", { ascending: false });
  if (!showArchived) q = q.neq("status", "archived");
  const { data: surveys } = await q;

  const rows = (surveys ?? []).map((sv) => {
    const vessel = Array.isArray(sv.fm_vessels) ? sv.fm_vessels[0] : sv.fm_vessels;
    return { ...sv, vesselName: sv.vessel_name || vessel?.name || "—", sum: summarise(sv.fm_survey_items ?? []) };
  });
  const open = rows.filter((r) => r.status === "open");
  const blocking = open.reduce((n, r) => n + r.sum.essentialBlocking, 0);
  const defects = open.reduce((n, r) => n + r.sum.defects, 0);
  const signed = rows.filter((r) => r.status === "signed_off").length;

  return (
    <>
      <PageHeader
        title="Surveys"
        subtitle="Structural and pre-passage inspections"
        action={<LinkButton href="/admin/surveys/new">New survey</LinkButton>}
      />
      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Open surveys" value={String(open.length)} />
          <StatCard label="Essential items outstanding" value={String(blocking)} hint="Unchecked, defect or no access" />
          <StatCard label="Defects recorded" value={String(defects)} hint="Across open surveys" />
          <StatCard label="Signed off" value={String(signed)} />
        </div>

        {rows.length > 0 ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Number</th>
                  <th className="fm-th">Vessel</th>
                  <th className="fm-th">Survey</th>
                  <th className="fm-th">Date</th>
                  <th className="fm-th">Essential</th>
                  <th className="fm-th">All items</th>
                  <th className="fm-th text-right">Defects</th>
                  <th className="fm-th">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="fm-td">
                      <Link href={`/admin/surveys/${r.id}`} className="font-medium text-navy hover:underline">{r.number}</Link>
                    </td>
                    <td className="fm-td">
                      <div className="font-medium text-slate-800">{r.vesselName}</div>
                      {r.location && <div className="text-xs text-slate-500">{r.location}</div>}
                    </td>
                    <td className="fm-td text-slate-600">{r.title}</td>
                    <td className="fm-td text-slate-500">{fmtDate(r.survey_date)}</td>
                    <td className="fm-td"><Progress done={r.sum.essentialAnswered} total={r.sum.essential} tone="amber" /></td>
                    <td className="fm-td"><Progress done={r.sum.answered} total={r.sum.total} /></td>
                    <td className="fm-td text-right tabular-nums">
                      {r.sum.defects > 0 ? <span className="font-medium text-red-700">{r.sum.defects}</span> : <span className="text-slate-400">0</span>}
                    </td>
                    <td className="fm-td">
                      {r.status === "signed_off" ? (
                        <span title={outcomeLabel(r.outcome)}>
                          <Badge tone={r.outcome === "not_fit" ? "red" : r.outcome === "fit_conditions" ? "amber" : "green"}>{outcomeLabel(r.outcome)}</Badge>
                        </span>
                      ) : (
                        <Badge>{r.status}</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <EmptyState title="No surveys yet" hint="Start one from the structural inspection checklist." />
        )}

        <p className="text-xs text-slate-500">
          {showArchived ? (
            <Link href="/admin/surveys" className="text-navy hover:underline">Hide archived surveys</Link>
          ) : (
            <Link href="/admin/surveys?show=all" className="text-navy hover:underline">Show archived surveys</Link>
          )}
        </p>
      </div>
    </>
  );
}
