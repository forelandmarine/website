import { PageHeader, Card } from "@/components/admin/ui";
import { LineItemBuilder } from "@/components/admin/LineItemBuilder";
import { getBuilderData } from "@/lib/admin/data";
import { createQuote } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewQuotePage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  const { client } = await searchParams;
  const { services, clients, vessels, defaultVatRate } = await getBuilderData();

  return (
    <>
      <PageHeader title="New proposal" />
      <div className="p-6 lg:p-8">
        <Card className="p-6">
          <LineItemBuilder
            mode="quote"
            action={createQuote}
            services={services}
            clients={clients}
            vessels={vessels}
            defaults={{ client_id: client ?? null, currency: "gbp" }}
            defaultVatRate={defaultVatRate}
            submitLabel="Create proposal"
            cancelHref="/admin/quotes"
          />
        </Card>
      </div>
    </>
  );
}
