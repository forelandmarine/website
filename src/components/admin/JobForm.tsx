"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Field, TextArea, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";

const JOB_STATUS = [
  { value: "lead", label: "Lead" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In progress" },
  { value: "on_hold", label: "On hold" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];
const CURRENCIES = [
  { value: "gbp", label: "GBP" },
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
];

type ClientOpt = { id: string; name: string };
type VesselOpt = { id: string; client_id: string; name: string };

export function JobForm({
  action,
  clients,
  vessels,
  defaults,
  submitLabel,
}: {
  action: (fd: FormData) => void;
  clients: ClientOpt[];
  vessels: VesselOpt[];
  defaults?: {
    id?: string;
    client_id?: string | null;
    vessel_id?: string | null;
    title?: string | null;
    status?: string | null;
    description?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    budget?: number | null;
    currency?: string | null;
  };
  submitLabel: string;
}) {
  const [clientId, setClientId] = useState(defaults?.client_id ?? "");
  const [vesselId, setVesselId] = useState(defaults?.vessel_id ?? "");
  const clientVessels = useMemo(() => vessels.filter((v) => v.client_id === clientId), [vessels, clientId]);

  return (
    <form action={action} className="space-y-4">
      {defaults?.id && <input type="hidden" name="id" value={defaults.id} />}
      <FormGrid cols={2}>
        <label className="block">
          <span className="fm-label">Client</span>
          <select name="client_id" className="fm-fld" value={clientId} onChange={(e) => { setClientId(e.target.value); setVesselId(""); }}>
            <option value="">— None —</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="fm-label">Vessel</span>
          <select name="vessel_id" className="fm-fld" value={vesselId} onChange={(e) => setVesselId(e.target.value)} disabled={!clientId}>
            <option value="">— None —</option>
            {clientVessels.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </label>
      </FormGrid>
      <Field label="Title" name="title" required defaultValue={defaults?.title} />
      <FormGrid cols={3}>
        <SelectField label="Status" name="status" options={JOB_STATUS} defaultValue={defaults?.status ?? "lead"} />
        <Field label="Start date" name="start_date" type="date" defaultValue={defaults?.start_date} />
        <Field label="End date" name="end_date" type="date" defaultValue={defaults?.end_date} />
        <Field label="Budget" name="budget" type="number" step="0.01" defaultValue={defaults?.budget} />
        <SelectField label="Currency" name="currency" options={CURRENCIES} defaultValue={defaults?.currency ?? "gbp"} />
      </FormGrid>
      <TextArea label="Description" name="description" defaultValue={defaults?.description} />
      <div className="flex items-center gap-3 pt-2">
        <PendingButton>{submitLabel}</PendingButton>
        <Link href="/admin/jobs" className="text-sm text-slate-500 hover:text-slate-800">Cancel</Link>
      </div>
    </form>
  );
}
