import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { PageHeader, Card, Badge } from "@/components/admin/ui";
import { Field, TextArea, SelectField, FormGrid } from "@/components/admin/form";
import { PendingButton } from "@/components/admin/PendingButton";
import { fmtDateTime } from "@/lib/admin/format";
import { addEvent, deleteEvent } from "./actions";

export const dynamic = "force-dynamic";

const EVENT_TYPES = [
  { value: "engagement", label: "Engagement" },
  { value: "meeting", label: "Meeting" },
  { value: "survey", label: "Survey" },
  { value: "passage", label: "Passage" },
  { value: "holiday", label: "Holiday" },
  { value: "other", label: "Other" },
];

function monthBounds(ym: string): { start: Date; end: Date; label: string } {
  const [y, m] = ym.split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, 1));
  const end = new Date(Date.UTC(y, m, 1));
  return { start, end, label: start.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }) };
}

function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams;
  const now = new Date();
  const ym = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const { start, end, label } = monthBounds(ym);

  const supabase = await getSupabaseServer();
  const [{ data: events }, { data: jobs }] = await Promise.all([
    supabase
      .from("fm_events")
      .select("id, title, type, start_at, all_day, location")
      .gte("start_at", start.toISOString())
      .lt("start_at", end.toISOString())
      .order("start_at"),
    supabase.from("fm_jobs").select("id, number, title").in("status", ["scheduled", "in_progress"]).order("created_at", { ascending: false }),
  ]);

  const firstWeekday = (start.getUTCDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const eventsByDay = new Map<number, typeof events>();
  (events ?? []).forEach((e) => {
    const day = new Date(e.start_at).getUTCDate();
    const arr = eventsByDay.get(day) ?? [];
    arr.push(e);
    eventsByDay.set(day, arr as typeof events);
  });

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle={label}
        action={
          <div className="flex items-center gap-2">
            <Link href={`/admin/calendar?month=${shiftMonth(ym, -1)}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">←</Link>
            <Link href="/admin/calendar" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">Today</Link>
            <Link href={`/admin/calendar?month=${shiftMonth(ym, 1)}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">→</Link>
          </div>
        }
      />
      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_320px] lg:p-8">
        {/* Month grid */}
        <Card className="p-3">
          <div className="grid grid-cols-7 gap-px text-center text-xs font-medium text-slate-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-slate-200">
            {cells.map((day, i) => (
              <div key={i} className="min-h-[92px] bg-white p-1.5">
                {day && (
                  <>
                    <div className="text-xs text-slate-400">{day}</div>
                    <div className="mt-1 space-y-1">
                      {(eventsByDay.get(day) ?? []).map((e) => (
                        <div key={e.id} className="truncate rounded bg-navy/10 px-1.5 py-0.5 text-[0.7rem] text-navy" title={e.title}>
                          {!e.all_day && new Date(e.start_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " "}
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Add + upcoming */}
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Add event</h3>
            <form action={addEvent} className="space-y-3">
              <Field label="Title" name="title" required />
              <FormGrid cols={2}>
                <Field label="Date" name="date" type="date" required />
                <Field label="Time" name="time" type="time" />
              </FormGrid>
              <SelectField label="Type" name="type" options={EVENT_TYPES} defaultValue="engagement" />
              <label className="block">
                <span className="fm-label">Link to engagement</span>
                <select name="job_id" className="fm-fld">
                  <option value="">— None —</option>
                  {(jobs ?? []).map((j) => <option key={j.id} value={j.id}>{j.number} · {j.title}</option>)}
                </select>
              </label>
              <Field label="Location" name="location" />
              <TextArea label="Notes" name="notes" rows={2} />
              <PendingButton>Add event</PendingButton>
            </form>
          </Card>

          <Card className="p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">This month</h3>
            {events && events.length > 0 ? (
              <ul className="space-y-2">
                {events.map((e) => (
                  <li key={e.id} className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2 last:border-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm text-slate-700">{e.title}</span>
                        <Badge tone="slate">{e.type}</Badge>
                      </div>
                      <p className="text-xs text-slate-400">{fmtDateTime(e.start_at)}{e.location ? ` · ${e.location}` : ""}</p>
                    </div>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={e.id} />
                      <button className="text-slate-300 hover:text-red-600" aria-label="Delete">✕</button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">No events this month.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
