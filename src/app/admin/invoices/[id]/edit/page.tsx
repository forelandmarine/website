import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { LineItemBuilder } from "@/components/admin/LineItemBuilder";
import { getBuilderData } from "@/lib/admin/data";
import { updateInvoice } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const { services, clients, vessels, defaultVatRate } = await getBuilderData();
  const { data: invoice } = await supabase.from("fm_invoices").select("*").eq("id", id).single();
  if (!invoice) notFound();
  const { data: items } = await supabase.from("fm_invoice_items").select("*").eq("invoice_id", id).order("sort");

  return (
    <>
      <PageHeader title={`Edit ${invoice.number}`} />
      <div className="p-6 lg:p-8">
        <Card className="p-6">
          <LineItemBuilder
            mode="invoice"
            action={updateInvoice}
            services={services}
            clients={clients}
            vessels={vessels}
            defaults={{ ...invoice, items: items ?? [] }}
            defaultVatRate={defaultVatRate}
            submitLabel="Save changes"
            cancelHref={`/admin/invoices/${id}`}
          />
        </Card>
      </div>
    </>
  );
}
