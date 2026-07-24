import { Field, TextArea, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import Link from "next/link";

const CLIENT_TYPES = [
  { value: "owner", label: "Owner" },
  { value: "captain", label: "Captain" },
  { value: "management", label: "Management company" },
  { value: "yard", label: "Shipyard" },
  { value: "broker", label: "Broker" },
  { value: "other", label: "Other" },
];

type ClientDefaults = {
  id?: string;
  name?: string | null;
  type?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  notes?: string | null;
};

export function ClientForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: ClientDefaults;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      {defaults?.id && <input type="hidden" name="id" value={defaults.id} />}
      <FormGrid cols={2}>
        <Field label="Name" name="name" required defaultValue={defaults?.name} />
        <SelectField label="Type" name="type" options={CLIENT_TYPES} defaultValue={defaults?.type ?? "owner"} />
        <Field label="Company" name="company" defaultValue={defaults?.company} />
        <Field label="Country" name="country" defaultValue={defaults?.country} />
        <Field label="Email" name="email" type="email" defaultValue={defaults?.email} />
        <Field label="Phone" name="phone" defaultValue={defaults?.phone} />
      </FormGrid>
      <TextArea label="Notes" name="notes" defaultValue={defaults?.notes} />
      <div className="flex items-center gap-3 pt-2">
        <PendingButton>{submitLabel}</PendingButton>
        <Link href="/admin/clients" className="text-sm text-slate-500 hover:text-slate-800">
          Cancel
        </Link>
      </div>
    </form>
  );
}
