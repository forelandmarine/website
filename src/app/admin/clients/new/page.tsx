import { PageHeader, Card } from "@/components/admin/ui";
import { ClientForm } from "@/components/admin/ClientForm";
import { createClient } from "../actions";

export const dynamic = "force-dynamic";

export default function NewClientPage() {
  return (
    <>
      <PageHeader title="New client" />
      <div className="p-6 lg:p-8">
        <Card className="max-w-2xl p-6">
          <ClientForm action={createClient} submitLabel="Create client" />
        </Card>
      </div>
    </>
  );
}
