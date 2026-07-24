import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, StatCard, Card, money, fmtDate, titleCase } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

async function countWhere(table: string, column: string, values: string[]): Promise<number> {
  const supabase = await getSupabaseServer();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .in(column, values);
  return count ?? 0;
}

export default async function Dashboard() {
  const supabase = await getSupabaseServer();

  const [newEnquiries, activeJobs, quotesOut, tsActive] = await Promise.all([
    countWhere("fm_enquiries", "status", ["new"]),
    countWhere("fm_jobs", "status", ["scheduled", "in_progress"]),
    countWhere("fm_quotes", "status", ["sent"]),
    countWhere("technical_support_subscriptions", "status", ["active"]),
  ]);

  const { data: outstanding } = await supabase
    .from("fm_invoices")
    .select("total, amount_paid, currency")
    .in("status", ["sent", "part_paid", "overdue"]);
  const outstandingValue = outstanding?.reduce((s, i) => s + (Number(i.total) - Number(i.amount_paid)), 0) ?? 0;

  const { data: recent } = await supabase
    .from("fm_enquiries")
    .select("id, name, service, vessel_name, created_at, status")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Foreland Marine operations" />
      <div className="p-6 lg:p-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="New enquiries" value={String(newEnquiries)} href="/admin/enquiries" />
          <StatCard label="Active engagements" value={String(activeJobs)} href="/admin/jobs" />
          <StatCard label="Proposals out" value={String(quotesOut)} href="/admin/quotes" />
          <StatCard label="Owed to us" value={money(outstandingValue)} hint={`${outstanding?.length ?? 0} open invoice(s)`} href="/admin/invoices" />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Recurring subscriptions" value={String(tsActive)} hint="Technical Support, active" href="/admin/reports" />
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Latest enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-navy hover:underline">
              View all &rarr;
            </Link>
          </div>
          <Card className="overflow-x-auto p-0">
            {recent && recent.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="fm-th">Name</th>
                    <th className="fm-th">Service</th>
                    <th className="fm-th">Vessel</th>
                    <th className="fm-th">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((e) => (
                    <tr key={e.id} className="border-b border-slate-100 last:border-0">
                      <td className="fm-td">
                        <Link href="/admin/enquiries" className="font-medium text-navy hover:underline">
                          {e.name || "—"}
                        </Link>
                      </td>
                      <td className="fm-td">{titleCase(e.service)}</td>
                      <td className="fm-td">{e.vessel_name || "—"}</td>
                      <td className="fm-td text-slate-500">{fmtDate(e.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-8 text-center text-sm text-slate-500">
                No enquiries yet. When someone submits the website contact form, it lands here.
              </p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
