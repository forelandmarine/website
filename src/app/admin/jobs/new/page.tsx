import { PageHeader, Card } from "@/components/admin/ui";
import { JobForm } from "@/components/admin/JobForm";
import { getBuilderData } from "@/lib/admin/data";
import { createJob } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewJobPage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  const { client } = await searchParams;
  const { clients, vessels } = await getBuilderData();
  return (
    <>
      <PageHeader title="New engagement" />
      <div className="p-6 lg:p-8">
        <Card className="max-w-3xl p-6">
          <JobForm action={createJob} clients={clients} vessels={vessels} defaults={{ client_id: client ?? null }} submitLabel="Create engagement" />
        </Card>
      </div>
    </>
  );
}
