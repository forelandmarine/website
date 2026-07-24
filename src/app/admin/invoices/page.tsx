import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, LinkButton, money, fmtDate } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const supabase = await getSupabaseServer();
  const { data: invoices } = await supabase
    .from("fm_invoices")
    .select("id, number, status, total, amount_paid, currency, issue_date, due_date, fm_clients(name)")
    .order("issue_date", { ascending: false });

  const outstanding = (invoices ?? [])
    .filter((i) => ["sent", "part_paid", "overdue"].includes(i.status))
    .reduce((s, i) => s + (Number(i.total) - Number(i.amount_paid)), 0);

  return (
    <>
      <PageHeader
        title="Invoices"
        subtitle={`${money(outstanding)} outstanding`}
        action={<LinkButton href="/admin/invoices/new">New invoice</LinkButton>}
      />
      <div className="p-6 lg:p-8">
        {invoices && invoices.length > 0 ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Number</th>
                  <th className="fm-th">Client</th>
                  <th className="fm-th">Status</th>
                  <th className="fm-th">Issued</th>
                  <th className="fm-th">Due</th>
                  <th className="fm-th text-right">Total</th>
                  <th className="fm-th text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => {
                  const client = Array.isArray(i.fm_clients) ? i.fm_clients[0] : i.fm_clients;
                  const balance = Number(i.total) - Number(i.amount_paid);
                  return (
                    <tr key={i.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="fm-td"><Link href={`/admin/invoices/${i.id}`} className="font-medium text-navy hover:underline">{i.number}</Link></td>
                      <td className="fm-td">{client?.name || "—"}</td>
                      <td className="fm-td"><Badge>{i.status}</Badge></td>
                      <td className="fm-td text-slate-500">{fmtDate(i.issue_date)}</td>
                      <td className="fm-td text-slate-500">{fmtDate(i.due_date)}</td>
                      <td className="fm-td text-right">{money(i.total, i.currency)}</td>
                      <td className="fm-td text-right">{money(balance, i.currency)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ) : (
          <EmptyState title="No invoices yet" hint="Raise one from a proposal, an engagement, or from scratch." />
        )}
      </div>
    </>
  );
}
