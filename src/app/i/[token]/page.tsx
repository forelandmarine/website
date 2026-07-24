import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabaseServer } from "@/lib/supabase/server";
import { DocView } from "@/components/DocView";
import { PayInvoice } from "@/components/PayInvoice";
import { money } from "@/lib/admin/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Invoice | Foreland Marine",
  robots: { index: false, follow: false },
};

const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

export default async function PublicInvoice({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ paid?: string }>;
}) {
  const { token } = await params;
  const { paid } = await searchParams;
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.rpc("fm_invoice_by_token", { t: token });
  if (error || !data || !data.invoice) notFound();

  const inv = data.invoice;
  const amountPaid = (data.payments ?? []).reduce((s: number, p: { amount: number }) => s + Number(p.amount), 0);
  const balance = Number(inv.total) - amountPaid;

  return (
    <div className="fm-admin fixed inset-0 z-[70] overflow-y-auto bg-slate-100 print:static print:overflow-visible print:bg-white">
      {paid === "1" && (
        <div className="mx-auto max-w-3xl px-4 pt-6 print:hidden">
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Thank you. Your payment has been received.
          </div>
        </div>
      )}
      <DocView
        kind="Invoice"
        number={inv.number}
        title={inv.title}
        status={inv.status}
        currency={inv.currency}
        issueDate={inv.issue_date}
        dueDate={inv.due_date}
        client={data.client}
        vessel={data.vessel}
        items={data.items ?? []}
        subtotal={Number(inv.subtotal)}
        vatTotal={Number(inv.vat_total)}
        total={Number(inv.total)}
        amountPaid={amountPaid}
        notes={inv.notes}
        settings={data.settings ?? {}}
      />
      {balance > 0 && inv.status !== "void" && (
        <div className="mx-auto max-w-3xl px-4 pb-10 print:hidden">
          {stripeEnabled ? (
            <PayInvoice token={token} label={`Pay ${money(balance, inv.currency)} by card`} />
          ) : (
            <p className="text-sm text-slate-500">
              To settle this invoice by bank transfer, use the account details above or reply to your email.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
