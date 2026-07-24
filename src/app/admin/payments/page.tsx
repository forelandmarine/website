import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, StatCard, Badge, EmptyState, money, fmtDate, titleCase } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const supabase = await getSupabaseServer();
  const { data: payments } = await supabase
    .from("fm_payments")
    .select("id, amount, currency, type, method, status, reference, paid_at, created_at, invoice_id, fm_invoices(number), fm_clients(name)")
    .order("created_at", { ascending: false })
    .limit(300);

  const received = (payments ?? []).filter((p) => p.status === "succeeded").reduce((s, p) => s + Number(p.amount), 0);
  const pending = (payments ?? []).filter((p) => p.status === "pending").reduce((s, p) => s + Number(p.amount), 0);

  return (
    <>
      <PageHeader title="Payments" subtitle="All received and pending payments" />
      <div className="p-6 lg:p-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard label="Received" value={money(received)} />
          <StatCard label="Pending" value={money(pending)} />
          <StatCard label="Count" value={String(payments?.length ?? 0)} />
        </div>
        {payments && payments.length > 0 ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Date</th>
                  <th className="fm-th">Invoice</th>
                  <th className="fm-th">Client</th>
                  <th className="fm-th">Type / method</th>
                  <th className="fm-th">Status</th>
                  <th className="fm-th text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => {
                  const invoice = Array.isArray(p.fm_invoices) ? p.fm_invoices[0] : p.fm_invoices;
                  const client = Array.isArray(p.fm_clients) ? p.fm_clients[0] : p.fm_clients;
                  return (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0">
                      <td className="fm-td text-slate-500">{fmtDate(p.paid_at || p.created_at)}</td>
                      <td className="fm-td">
                        {p.invoice_id ? <Link href={`/admin/invoices/${p.invoice_id}`} className="text-navy hover:underline">{invoice?.number || "—"}</Link> : "—"}
                      </td>
                      <td className="fm-td">{client?.name || "—"}</td>
                      <td className="fm-td">{titleCase(p.type)} · {titleCase(p.method)}</td>
                      <td className="fm-td"><Badge>{p.status}</Badge></td>
                      <td className="fm-td text-right">{money(p.amount, p.currency)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ) : (
          <EmptyState title="No payments yet" hint="Record payments from an invoice, or take card payments via Stripe." />
        )}
      </div>
    </>
  );
}
