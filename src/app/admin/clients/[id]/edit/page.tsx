import { notFound, redirect } from "next/navigation";
import { getCurrentProfile, getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { ClientForm } from "@/components/admin/ClientForm";
import { updateClient } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  const supabase = await getSupabaseServer();
  const { data: client } = await supabase.from("fm_clients").select("*").eq("id", id).single();
  if (!client) notFound();

  return (
    <>
      <PageHeader title={`Edit ${client.name}`} />
      <div className="p-6 lg:p-8">
        <Card className="max-w-2xl p-6">
          <ClientForm action={updateClient} defaults={client} submitLabel="Save changes" />
        </Card>
      </div>
    </>
  );
}
