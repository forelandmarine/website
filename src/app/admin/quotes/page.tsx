import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, EmptyState, LinkButton, money, fmtDate } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const supabase = await getSupabaseServer();
  const { data: quotes } = await supabase
    .from("fm_quotes")
    .select("id, number, title, status, total, currency, created_at, fm_clients(name)")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        title="Proposals"
        subtitle="Quotes and fee proposals"
        action={<LinkButton href="/admin/quotes/new">New proposal</LinkButton>}
      />
      <div className="p-6 lg:p-8">
        {quotes && quotes.length > 0 ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Number</th>
                  <th className="fm-th">Client</th>
                  <th className="fm-th">Title</th>
                  <th className="fm-th">Status</th>
                  <th className="fm-th text-right">Total</th>
                  <th className="fm-th">Created</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => {
                  const client = Array.isArray(q.fm_clients) ? q.fm_clients[0] : q.fm_clients;
                  return (
                    <tr key={q.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="fm-td">
                        <Link href={`/admin/quotes/${q.id}`} className="font-medium text-navy hover:underline">
                          {q.number}
                        </Link>
                      </td>
                      <td className="fm-td">{client?.name || "—"}</td>
                      <td className="fm-td">{q.title || "—"}</td>
                      <td className="fm-td"><Badge>{q.status}</Badge></td>
                      <td className="fm-td text-right">{money(q.total, q.currency)}</td>
                      <td className="fm-td text-slate-500">{fmtDate(q.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ) : (
          <EmptyState title="No proposals yet" hint="Create a proposal from scratch or from a client." />
        )}
      </div>
    </>
  );
}
