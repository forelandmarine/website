import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabaseServer } from "@/lib/supabase/server";
import { DocView } from "@/components/DocView";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Proposal | Foreland Marine",
  robots: { index: false, follow: false },
};

export default async function PublicQuote({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.rpc("fm_quote_by_token", { t: token });
  if (error || !data || !data.quote) notFound();

  const q = data.quote;
  return (
    <div className="fm-admin fm-doc-overlay fixed inset-0 z-[70] overflow-y-auto bg-slate-100 print:static print:overflow-visible print:bg-white">
      <DocView
        kind="Proposal"
        number={q.number}
        title={q.title}
        status={q.status}
        currency={q.currency}
        validUntil={q.valid_until}
        client={data.client}
        vessel={data.vessel}
        items={data.items ?? []}
        subtotal={Number(q.subtotal)}
        vatTotal={Number(q.vat_total)}
        total={Number(q.total)}
        depositPercent={Number(q.deposit_percent)}
        notes={q.notes}
        settings={data.settings ?? {}}
        vatTreatment={q.vat_treatment}
      />
    </div>
  );
}
