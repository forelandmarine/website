import { PageHeader, Card } from "@/components/admin/ui";
import { LineItemBuilder } from "@/components/admin/LineItemBuilder";
import { getBuilderData } from "@/lib/admin/data";
import { getSupabaseServer } from "@/lib/supabase/server";
import { createInvoice } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage({ searchParams }: { searchParams: Promise<{ client?: string; job?: string }> }) {
  const { client, job } = await searchParams;
  const { services, clients, vessels, defaultVatRate } = await getBuilderData();

  let clientId: string | null = client ?? null;
  let vesselId: string | null = null;
  let currency = "gbp";
  if (job) {
    const supabase = await getSupabaseServer();
    const { data: j } = await supabase.from("fm_jobs").select("client_id, vessel_id, currency").eq("id", job).single();
    if (j) {
      clientId = j.client_id;
      vesselId = j.vessel_id;
      currency = j.currency || "gbp";
    }
  }

  return (
    <>
      <PageHeader title="New invoice" />
      <div className="p-6 lg:p-8">
        <Card className="p-6">
          <LineItemBuilder
            mode="invoice"
            action={createInvoice}
            services={services}
            clients={clients}
            vessels={vessels}
            defaults={{ client_id: clientId, vessel_id: vesselId, currency }}
            defaultVatRate={defaultVatRate}
            submitLabel="Create invoice"
            cancelHref="/admin/invoices"
          />
        </Card>
      </div>
    </>
  );
}
