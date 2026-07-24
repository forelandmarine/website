import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, LinkButton, money, fmtDate } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const supabase = await getSupabaseServer();
  const { data: jobs } = await supabase
    .from("fm_jobs")
    .select("id, number, title, status, budget, currency, start_date, fm_clients(name), fm_vessels(name)")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        title="Engagements"
        subtitle="Projects, retainers and representation"
        action={<LinkButton href="/admin/jobs/new">New engagement</LinkButton>}
      />
      <div className="p-6 lg:p-8">
        {jobs && jobs.length > 0 ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Number</th>
                  <th className="fm-th">Title</th>
                  <th className="fm-th">Client</th>
                  <th className="fm-th">Vessel</th>
                  <th className="fm-th">Status</th>
                  <th className="fm-th text-right">Budget</th>
                  <th className="fm-th">Start</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => {
                  const client = Array.isArray(j.fm_clients) ? j.fm_clients[0] : j.fm_clients;
                  const vessel = Array.isArray(j.fm_vessels) ? j.fm_vessels[0] : j.fm_vessels;
                  return (
                    <tr key={j.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="fm-td">
                        <Link href={`/admin/jobs/${j.id}`} className="font-medium text-navy hover:underline">{j.number}</Link>
                      </td>
                      <td className="fm-td">{j.title || "—"}</td>
                      <td className="fm-td">{client?.name || "—"}</td>
                      <td className="fm-td">{vessel?.name || "—"}</td>
                      <td className="fm-td"><Badge>{j.status}</Badge></td>
                      <td className="fm-td text-right">{j.budget ? money(j.budget, j.currency) : "—"}</td>
                      <td className="fm-td text-slate-500">{fmtDate(j.start_date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ) : (
          <EmptyState title="No engagements yet" hint="Create one, or convert an accepted proposal." />
        )}
      </div>
    </>
  );
}
