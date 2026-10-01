"use client";

import { useMemo, useState, useTransition } from "react";
import { RESULTS, summarise, type Result } from "@/lib/admin/survey-templates";
import { saveSurveyItem, addSurveyItem, deleteSurveyItem } from "@/app/admin/surveys/actions";
import { PendingButton } from "@/components/admin/PendingButton";

export type ChecklistItem = {
  id: string;
  section: string;
  label: string;
  essential: boolean;
  result: Result | null;
  finding: string | null;
  custom: boolean;
};

type Filter = "all" | "essential" | "outstanding" | "issues";

const RESULT_STYLE: Record<Result, string> = {
  ok: "border-emerald-600 bg-emerald-600 text-white",
  defect: "border-red-600 bg-red-600 text-white",
  monitor: "border-amber-500 bg-amber-500 text-white",
  no_access: "border-slate-500 bg-slate-500 text-white",
};

export function SurveyChecklist({
  surveyId,
  items: initial,
  notes,
  locked,
}: {
  surveyId: string;
  items: ChecklistItem[];
  notes: Record<string, string | undefined>;
  locked: boolean;
}) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");
  const [saving, startSaving] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Server revalidation hands us fresh items after add/delete; keep local edits otherwise.
  const ids = initial.map((i) => i.id).join(",");
  const [seenIds, setSeenIds] = useState(ids);
  if (ids !== seenIds) {
    setSeenIds(ids);
    setItems(initial);
  }

  const sum = useMemo(() => summarise(items), [items]);
  const sections = useMemo(() => {
    const order: string[] = [];
    for (const i of items) if (!order.includes(i.section)) order.push(i.section);
    return order;
  }, [items]);

  function patch(id: string, p: { result?: Result | null; finding?: string | null }) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...p } : i)));
    startSaving(async () => {
      const res = await saveSurveyItem(id, surveyId, p);
      setError(res.ok ? null : "A change did not save. Check your connection and try again.");
    });
  }

  function visible(i: ChecklistItem) {
    if (filter === "essential") return i.essential;
    if (filter === "outstanding") return !i.result;
    if (filter === "issues") return i.result === "defect" || i.result === "monitor" || i.result === "no_access";
    return true;
  }

  const blockers = items.filter((i) => i.essential && (i.result === "defect" || i.result === "no_access"));
  const ready = sum.essentialBlocking === 0;

  return (
    <div className="space-y-6">
      {/* Pre-passage readiness */}
      <div className={`rounded-lg border p-5 ${ready ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900">
            {ready ? "All essential items cleared for the passage" : "Not yet cleared for the passage"}
          </h2>
          <span className="text-sm tabular-nums text-slate-600">
            Essential {sum.essentialAnswered}/{sum.essential} checked. All items {sum.answered}/{sum.total}.
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          {sum.defects} defect{sum.defects === 1 ? "" : "s"}, {sum.monitor} to monitor, {sum.noAccess} not accessed.
          {!ready && ` ${sum.essentialBlocking} essential item${sum.essentialBlocking === 1 ? "" : "s"} unchecked, defective or not accessed.`}
        </p>
        {blockers.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm">
            {blockers.map((b) => (
              <li key={b.id} className="text-red-800">
                <span className="font-medium">{b.section}:</span> {b.label}
                {b.finding ? <span className="text-slate-600">. {b.finding}</span> : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        {(
          [
            ["all", "All items"],
            ["essential", "Essential only"],
            ["outstanding", "Not checked"],
            ["issues", "Defects, monitor, no access"],
          ] as [Filter, string][]
        ).map(([f, label]) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              filter === f ? "border-navy bg-navy text-white" : "border-slate-300 bg-white text-slate-600 hover:border-navy"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400">{saving ? "Saving…" : error ? <span className="text-red-600">{error}</span> : "All changes saved"}</span>
      </div>

      {sections.map((section) => {
        const rows = items.filter((i) => i.section === section && visible(i));
        const all = items.filter((i) => i.section === section);
        if (rows.length === 0 && filter !== "all") return null;
        const done = all.filter((i) => i.result).length;
        return (
          <section key={section} className="rounded-lg border border-slate-200 bg-white">
            <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 px-5 py-3">
              <h3 className="font-semibold text-slate-900">{section}</h3>
              <span className="text-xs tabular-nums text-slate-500">{done}/{all.length}</span>
            </div>
            {notes[section] && <p className="border-b border-slate-100 px-5 py-2 text-sm text-slate-500">{notes[section]}</p>}
            <ul>
              {rows.map((i) => (
                <li key={i.id} className="border-b border-slate-100 px-5 py-3 last:border-0">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
                    <div className="flex flex-1 gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-[0.65rem] font-bold ${
                          i.essential ? "bg-navy text-white" : "text-transparent"
                        }`}
                        title={i.essential ? "Essential before the passage" : undefined}
                      >
                        E
                      </span>
                      <span className="text-sm text-slate-800">{i.label}</span>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-1 pl-8 lg:pl-0">
                      {RESULTS.map((r) => {
                        const on = i.result === r.value;
                        return (
                          <button
                            key={r.value}
                            type="button"
                            disabled={locked}
                            onClick={() => patch(i.id, { result: on ? null : r.value })}
                            className={`rounded border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed ${
                              on ? RESULT_STYLE[r.value] : "border-slate-300 bg-white text-slate-600 hover:border-slate-500"
                            }`}
                          >
                            {r.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2 pl-8">
                    <textarea
                      key={`${i.id}-${seenIds}`}
                      defaultValue={i.finding ?? ""}
                      disabled={locked}
                      rows={i.finding && i.finding.length > 80 ? 3 : 1}
                      placeholder="Finding"
                      onBlur={(e) => {
                        const v = e.target.value.trim() || null;
                        if (v !== (i.finding ?? null)) patch(i.id, { finding: v });
                      }}
                      className="fm-fld flex-1 resize-y !py-1.5 text-sm"
                    />
                    {i.custom && !locked && (
                      <form action={deleteSurveyItem}>
                        <input type="hidden" name="id" value={i.id} />
                        <input type="hidden" name="survey_id" value={surveyId} />
                        <PendingButton variant="danger" className="!px-2 !py-1.5 text-xs" pendingLabel="…">Remove</PendingButton>
                      </form>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {!locked && filter === "all" && (
              <details className="border-t border-slate-100 px-5 py-2">
                <summary className="cursor-pointer text-xs font-medium text-navy">Add item to {section}</summary>
                <form action={addSurveyItem} className="mt-2 flex flex-wrap items-center gap-2 pb-2">
                  <input type="hidden" name="survey_id" value={surveyId} />
                  <input type="hidden" name="section" value={section} />
                  <input name="label" required placeholder="Item" className="fm-fld min-w-[16rem] flex-1 !py-1.5 text-sm" />
                  <label className="flex items-center gap-1.5 text-xs text-slate-600">
                    <input type="checkbox" name="essential" /> Essential
                  </label>
                  <PendingButton variant="outline" className="!px-3 !py-1.5 text-xs">Add</PendingButton>
                </form>
              </details>
            )}
          </section>
        );
      })}
    </div>
  );
}
