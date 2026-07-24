import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, LinkButton, money, fmtDate, titleCase } from "@/components/admin/ui";
import { Field, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { setJobStatus, addStage, setStageStatus, deleteStage } from "../actions";

export const dynamic = "force-dynamic";

const JOB_STATUSES = ["lead", "scheduled", "in_progress", "on_hold", "completed", "cancelled"];
const STAGE_STATUSES = ["pending", "in_progress", "complete", "invoiced"];

export default async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const { data: job } = await supabase
    .from("fm_jobs")
    .select("*, fm_clients(id, name), fm_vessels(name)")
    .eq("id", id)
    .single();
  if (!job) notFound();
  const [{ data: stages }, { data: invoices }] = await Promise.all([
    supabase.from("fm_job_stages").select("*").eq("job_id", id).order("sort"),
    supabase.from("fm_invoices").select("id, number, status, total, currency, issue_date").eq("job_id", id).order("issue_date", { ascending: false }),
  ]);

  const client = Array.isArray(job.fm_clients) ? job.fm_clients[0] : job.fm_clients;
  const vessel = Array.isArray(job.fm_vessels) ? job.fm_vessels[0] : job.fm_vessels;

  return (
    <>
      <PageHeader
        title={job.number}
        subtitle={job.title || undefined}
        action={
          <div className="flex gap-2">
            <LinkButton href={`/admin/invoices/new?job=${id}`} variant="outline">Raise invoice</LinkButton>
            <LinkButton href={`/admin/jobs/${id}/edit`} variant="outline">Edit</LinkButton>
          </div>
        }
      />
      <div className="grid gap-6 p-6 lg:grid-cols-3 lg:p-8">
        <div className="space-y-6 lg:col-span-2">
          {job.description && (
            <Card className="p-5">
              <p className="whitespace-pre-wrap text-sm text-slate-600">{job.description}</p>
            </Card>
          )}

          {/* Stages */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Stages</h2>
            <div className="space-y-2">
              {stages && stages.length > 0 ? (
                stages.map((st) => (
                  <Card key={st.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-800">{st.name}</span>
                        <Badge>{st.status}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {[st.due_date ? `Due ${fmtDate(st.due_date)}` : null, st.amount ? money(st.amount, job.currency) : null].filter(Boolean).join(" · ") || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <form action={setStageStatus} className="flex items-center gap-1">
                        <input type="hidden" name="id" value={st.id} />
                        <input type="hidden" name="job_id" value={id} />
                        <select name="status" defaultValue={st.status} className="fm-fld !py-1.5 text-xs">
                          {STAGE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <PendingButton variant="outline" className="!px-2 !py-1.5 text-xs">Set</PendingButton>
                      </form>
                      <form action={deleteStage}>
                        <input type="hidden" name="id" value={st.id} />
                        <input type="hidden" name="job_id" value={id} />
                        <PendingButton variant="danger" className="!px-2 !py-1.5 text-xs">✕</PendingButton>
                      </form>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-slate-500">No stages yet.</p>
              )}
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-navy">+ Add stage</summary>
              <Card className="mt-3 p-4">
                <form action={addStage} className="space-y-3">
                  <input type="hidden" name="job_id" value={id} />
                  <FormGrid cols={3}>
                    <Field label="Name" name="name" required />
                    <Field label="Due date" name="due_date" type="date" />
                    <Field label="Amount" name="amount" type="number" step="0.01" />
                  </FormGrid>
                  <PendingButton>Add stage</PendingButton>
                </form>
              </Card>
            </details>
          </section>

          {/* Invoices */}
          {invoices && invoices.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Invoices</h2>
              <Card className="overflow-x-auto p-0">
                <table className="w-full">
                  <tbody>
                    {invoices.map((i) => (
                      <tr key={i.id} className="border-b border-slate-100 last:border-0">
                        <td className="fm-td"><Link href={`/admin/invoices/${i.id}`} className="font-medium text-navy hover:underline">{i.number}</Link></td>
                        <td className="fm-td"><Badge>{i.status}</Badge></td>
                        <td className="fm-td text-right">{money(i.total, i.currency)}</td>
                        <td className="fm-td text-slate-500">{fmtDate(i.issue_date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <Badge>{job.status}</Badge>
              <span className="text-xs text-slate-400">{titleCase(job.status)}</span>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-slate-400">Client</dt><dd>{client ? <Link className="text-navy hover:underline" href={`/admin/clients/${client.id}`}>{client.name}</Link> : "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Vessel</dt><dd className="text-slate-700">{vessel?.name || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Budget</dt><dd className="text-slate-700">{job.budget ? money(job.budget, job.currency) : "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Dates</dt><dd className="text-slate-700">{fmtDate(job.start_date)} – {fmtDate(job.end_date)}</dd></div>
            </dl>
          </Card>
          <Card className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Status</h3>
            <form action={setJobStatus} className="flex items-center gap-2">
              <input type="hidden" name="id" value={id} />
              <select name="status" defaultValue={job.status} className="fm-fld !py-1.5 text-sm">
                {JOB_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Set</PendingButton>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
