import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/admin/ui";
import { JobForm } from "@/components/admin/JobForm";
import { getBuilderData } from "@/lib/admin/data";
import { updateJob } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServer();
  const { clients, vessels } = await getBuilderData();
  const { data: job } = await supabase.from("fm_jobs").select("*").eq("id", id).single();
  if (!job) notFound();
  return (
    <>
      <PageHeader title={`Edit ${job.number}`} />
      <div className="p-6 lg:p-8">
        <Card className="max-w-3xl p-6">
          <JobForm action={updateJob} clients={clients} vessels={vessels} defaults={job} submitLabel="Save changes" />
        </Card>
      </div>
    </>
  );
}
