import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge, LinkButton, money, fmtDate } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/PendingButton";
import { CopyField } from "@/components/admin/CopyField";
import { sendQuote, setQuoteStatus, convertQuoteToJob, deleteQuote } from "../actions";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.forelandmarine.com";
const QUOTE_STATUSES = ["draft", "sent", "accepted", "declined", "expired"];

export default async function QuoteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();

  const { data: quote } = await supabase
    .from("fm_quotes")
    .select("*, fm_clients(id, name), fm_vessels(name)")
    .eq("id", id)
    .single();
  if (!quote) notFound();
  const { data: items } = await supabase.from("fm_quote_items").select("*").eq("quote_id", id).order("sort");

  const client = Array.isArray(quote.fm_clients) ? quote.fm_clients[0] : quote.fm_clients;
  const vessel = Array.isArray(quote.fm_vessels) ? quote.fm_vessels[0] : quote.fm_vessels;
  const deposit = (Number(quote.total) * Number(quote.deposit_percent)) / 100;
  const clientLink = `${SITE_URL}/q/${quote.public_token}`;

  return (
    <>
      <PageHeader
        title={quote.number}
        subtitle={quote.title || undefined}
        action={
          <div className="flex flex-wrap gap-2">
            <a href={`/q/${quote.public_token}`} target="_blank" rel="noopener" className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              View / print
            </a>
            <LinkButton href={`/admin/quotes/${id}/edit`} variant="outline">Edit</LinkButton>
          </div>
        }
      />
      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main */}
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
                      <td className="fm-td text-right">{money(it.unit_price, quote.currency)}</td>
                      <td className="fm-td text-right">{money(it.line_total, quote.currency)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr><td colSpan={3} className="fm-td text-right text-slate-500">Subtotal</td><td className="fm-td text-right">{money(quote.subtotal, quote.currency)}</td></tr>
                  <tr><td colSpan={3} className="fm-td text-right text-slate-500">VAT</td><td className="fm-td text-right">{money(quote.vat_total, quote.currency)}</td></tr>
                  <tr><td colSpan={3} className="fm-td text-right font-semibold">Total</td><td className="fm-td text-right font-semibold">{money(quote.total, quote.currency)}</td></tr>
                  {Number(quote.deposit_percent) > 0 && (
                    <tr><td colSpan={3} className="fm-td text-right text-slate-500">Deposit ({Number(quote.deposit_percent)}%)</td><td className="fm-td text-right">{money(deposit, quote.currency)}</td></tr>
                  )}
                </tfoot>
              </table>
            </Card>
            {quote.notes && (
              <Card className="p-5">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">Notes</h3>
                <p className="whitespace-pre-wrap text-sm text-slate-600">{quote.notes}</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <Badge>{quote.status}</Badge>
                <span className="text-xs text-slate-400">{fmtDate(quote.created_at)}</span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-slate-400">Client</dt><dd className="text-slate-700">{client ? <Link className="text-navy hover:underline" href={`/admin/clients/${client.id}`}>{client.name}</Link> : "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">Vessel</dt><dd className="text-slate-700">{vessel?.name || "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-400">Valid until</dt><dd className="text-slate-700">{fmtDate(quote.valid_until)}</dd></div>
              </dl>
            </Card>

            <Card className="space-y-3 p-5">
              <h3 className="text-sm font-semibold text-slate-900">Actions</h3>
              {quote.status === "draft" && (
                <form action={sendQuote}>
                  <input type="hidden" name="id" value={id} />
                  <PendingButton className="w-full">Mark as sent</PendingButton>
                </form>
              )}
              <form action={setQuoteStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={id} />
                <select name="status" defaultValue={quote.status} className="fm-fld !py-1.5 text-sm">
                  {QUOTE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Set</PendingButton>
              </form>
              {quote.status === "accepted" && (
                <form action={convertQuoteToJob}>
                  <input type="hidden" name="id" value={id} />
                  <PendingButton className="w-full">Convert to engagement</PendingButton>
                </form>
              )}
              <div>
                <p className="fm-label">Client link</p>
                <CopyField value={clientLink} />
              </div>
              <form action={deleteQuote} className="border-t border-slate-100 pt-3">
                <input type="hidden" name="id" value={id} />
                <PendingButton variant="danger" pendingLabel="Deleting…" className="w-full">Delete proposal</PendingButton>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
