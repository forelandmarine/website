import { Field, FormGrid, SelectField } from "@/components/admin/form";

const CLIENT_TYPES = [
  { value: "owner", label: "Owner" },
  { value: "captain", label: "Captain" },
  { value: "management", label: "Management company" },
  { value: "yard", label: "Yard" },
  { value: "broker", label: "Broker" },
  { value: "other", label: "Other" },
];

// Client not on file yet: filling in a name here creates the client when the
// form is saved and links it, overriding the client chosen above.
export function NewClientFields() {
  return (
    <details className="rounded-md border border-dashed border-slate-300 px-3 py-2">
      <summary className="cursor-pointer py-1 text-sm font-medium text-navy">+ New client</summary>
      <p className="mb-3 mt-1 text-xs text-slate-500">Fill in a name to add a client to file and link them to this survey.</p>
      <FormGrid>
        <Field label="Client name" name="new_client_name" />
        <SelectField label="Type" name="new_client_type" options={CLIENT_TYPES} defaultValue="owner" />
        <Field label="Company" name="new_client_company" />
        <Field label="Country" name="new_client_country" />
        <Field label="Email" name="new_client_email" type="email" />
        <Field label="Phone" name="new_client_phone" />
      </FormGrid>
    </details>
  );
}

export function SaveVesselToggle({ checked = true }: { checked?: boolean }) {
  return (
    <label className="flex min-h-10 items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" name="save_vessel" defaultChecked={checked} />
      Save a vessel not on file to the client's records
    </label>
  );
}
