import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { LineItemBuilder } from "@/components/admin/LineItemBuilder";
import { getBuilderData } from "@/lib/admin/data";
import { updateQuote } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const { services, clients, vessels, defaultVatRate } = await getBuilderData();
  const { data: quote } = await supabase.from("fm_quotes").select("*").eq("id", id).single();
  if (!quote) notFound();
  const { data: items } = await supabase.from("fm_quote_items").select("*").eq("quote_id", id).order("sort");

  return (
    <>
      <PageHeader title={`Edit ${quote.number}`} />
      <div className="p-6 lg:p-8">
        <Card className="p-6">
          <LineItemBuilder
            mode="quote"
            action={updateQuote}
            services={services}
            clients={clients}
            vessels={vessels}
            defaults={{ ...quote, items: items ?? [] }}
            defaultVatRate={defaultVatRate}
            submitLabel="Save changes"
            cancelHref={`/admin/quotes/${id}`}
          />
        </Card>
      </div>
    </>
  );
}
