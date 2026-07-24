import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, LinkButton, money, fmtDate } from "@/components/admin/ui";
import { Field, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { CopyField } from "@/components/admin/CopyField";
import { setInvoiceStatus, recordPayment, deleteInvoice } from "../actions";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forelandmarine.com";
const INV_STATUSES = ["draft", "sent", "part_paid", "paid", "overdue", "void"];
const PAY_TYPES = [
  { value: "deposit", label: "Deposit" },
  { value: "stage", label: "Stage" },
  { value: "retainer", label: "Retainer" },
  { value: "final", label: "Final" },
  { value: "other", label: "Other" },
];
const PAY_METHODS = [
  { value: "bank", label: "Bank transfer" },
  { value: "card", label: "Card" },
  { value: "cash", label: "Cash" },
  { value: "cheque", label: "Cheque" },
  { value: "stripe", label: "Stripe" },
];

export default async function InvoiceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const { data: inv } = await supabase
    .from("fm_invoices")
    .select("*, fm_clients(id, name), fm_vessels(name)")
    .eq("id", id)
    .single();
  if (!inv) notFound();
  const [{ data: items }, { data: payments }] = await Promise.all([
    supabase.from("fm_invoice_items").select("*").eq("invoice_id", id).order("sort"),
    supabase.from("fm_payments").select("*").eq("invoice_id", id).order("created_at", { ascending: false }),
  ]);

  const client = Array.isArray(inv.fm_clients) ? inv.fm_clients[0] : inv.fm_clients;
  const vessel = Array.isArray(inv.fm_vessels) ? inv.fm_vessels[0] : inv.fm_vessels;
  const balance = Number(inv.total) - Number(inv.amount_paid);
  const clientLink = `${SITE_URL}/i/${inv.public_token}`;

  return (
    <>
      <PageHeader
        title={inv.number}
        subtitle={client?.name || undefined}
        action={
          <div className="flex flex-wrap gap-2">
            <a href={`/i/${inv.public_token}`} target="_blank" rel="noopener" className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">View / print</a>
            <LinkButton href={`/admin/invoices/${id}/edit`} variant="outline">Edit</LinkButton>
          </div>
        }
      />
      <div className="grid gap-6 p-6 lg:grid-cols-3 lg:p-8">
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-x-auto p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="fm-th">Description</th>
                  <th className="fm-th text-right">Qty</th>
                  <th className="fm-th text-right">Unit price</th>
                  <th className="fm-th text-right">Line</th>
                </tr>
              </thead>
              <tbody>
                {(items ?? []).map((it) => (
                  <tr key={it.id} className="border-b border-slate-100 last:border-0">
                    <td className="fm-td">{it.description}</td>
                    <td className="fm-td text-right">{Number(it.qty)} {it.unit || ""}</td>
                    <td className="fm-td text-right">{money(it.unit_price, inv.currency)}</td>
                    <td className="fm-td text-right">{money(it.line_total, inv.currency)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><td colSpan={3} className="fm-td text-right text-slate-500">Subtotal</td><td className="fm-td text-right">{money(inv.subtotal, inv.currency)}</td></tr>
                <tr><td colSpan={3} className="fm-td text-right text-slate-500">VAT</td><td className="fm-td text-right">{money(inv.vat_total, inv.currency)}</td></tr>
                <tr><td colSpan={3} className="fm-td text-right font-semibold">Total</td><td className="fm-td text-right font-semibold">{money(inv.total, inv.currency)}</td></tr>
                <tr><td colSpan={3} className="fm-td text-right text-emerald-600">Paid</td><td className="fm-td text-right text-emerald-600">{money(inv.amount_paid, inv.currency)}</td></tr>
                <tr><td colSpan={3} className="fm-td text-right font-semibold">Balance</td><td className="fm-td text-right font-semibold">{money(balance, inv.currency)}</td></tr>
              </tfoot>
            </table>
          </Card>

          {/* Payments */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Payments</h2>
            {payments && payments.length > 0 ? (
              <Card className="overflow-x-auto p-0">
                <table className="w-full">
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b border-slate-100 last:border-0">
                        <td className="fm-td">{fmtDate(p.paid_at || p.created_at)}</td>
                        <td className="fm-td capitalize">{p.type} · {p.method}</td>
                        <td className="fm-td text-slate-500">{p.reference || ""}</td>
                        <td className="fm-td text-right">{money(p.amount, p.currency)}</td>
                        <td className="fm-td"><Badge>{p.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            ) : (
              <p className="text-sm text-slate-500">No payments recorded.</p>
            )}
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-navy">+ Record a payment</summary>
              <Card className="mt-3 p-5">
                <form action={recordPayment} className="space-y-3">
                  <input type="hidden" name="invoice_id" value={id} />
                  <FormGrid cols={3}>
                    <Field label="Amount" name="amount" type="number" step="0.01" required defaultValue={balance > 0 ? balance : undefined} />
                    <SelectField label="Type" name="type" options={PAY_TYPES} defaultValue="final" />
                    <SelectField label="Method" name="method" options={PAY_METHODS} defaultValue="bank" />
                    <Field label="Date" name="paid_at" type="date" />
                    <Field label="Reference" name="reference" className="sm:col-span-2" />
                  </FormGrid>
                  <PendingButton>Record payment</PendingButton>
                </form>
              </Card>
            </details>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <Badge>{inv.status}</Badge>
              <span className="text-xs text-slate-400">{fmtDate(inv.issue_date)}</span>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-slate-400">Client</dt><dd>{client ? <Link className="text-navy hover:underline" href={`/admin/clients/${client.id}`}>{client.name}</Link> : "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Vessel</dt><dd className="text-slate-700">{vessel?.name || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Due</dt><dd className="text-slate-700">{fmtDate(inv.due_date)}</dd></div>
            </dl>
          </Card>
          <Card className="space-y-3 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Actions</h3>
            <form action={setInvoiceStatus} className="flex items-center gap-2">
              <input type="hidden" name="id" value={id} />
              <select name="status" defaultValue={inv.status} className="fm-fld !py-1.5 text-sm">
                {INV_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Set</PendingButton>
            </form>
            <div>
              <p className="fm-label">Client payment link</p>
              <CopyField value={clientLink} />
            </div>
            <form action={deleteInvoice} className="border-t border-slate-100 pt-3">
              <input type="hidden" name="id" value={id} />
              <PendingButton variant="danger" pendingLabel="Deleting…" className="w-full">Delete invoice</PendingButton>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
