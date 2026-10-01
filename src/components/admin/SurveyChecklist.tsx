"use client";

import { useMemo, useState, useTransition } from "react";
import { RESULTS, PRIORITIES, summarise, type Result, type Priority } from "@/lib/admin/survey-templates";
import { saveSurveyItem, addSurveyItem, deleteSurveyItem, type PhotoView } from "@/app/admin/surveys/actions";
import { PendingButton } from "@/components/admin/PendingButton";
import { SurveyPhotos } from "@/components/admin/SurveyPhotos";

export type ChecklistItem = {
  id: string;
  section: string;
  label: string;
  essential: boolean;
  result: Result | null;
  finding: string | null;
  priority: Priority | null;
  recommendation: string | null;
  custom: boolean;
};

type Filter = "all" | "essential" | "outstanding" | "issues";

const RESULT_STYLE: Record<Result, string> = {
  ok: "border-emerald-600 bg-emerald-600 text-white",
  defect: "border-red-600 bg-red-600 text-white",
  monitor: "border-amber-500 bg-amber-500 text-white",
  no_access: "border-slate-500 bg-slate-500 text-white",
  n_a: "border-slate-400 bg-slate-400 text-white",
};

const PRIORITY_STYLE: Record<Priority, string> = {
  A: "border-red-600 bg-red-600 text-white",
  B: "border-amber-500 bg-amber-500 text-white",
  C: "border-slate-500 bg-slate-500 text-white",
};

const isIssue = (r: Result | null) => r === "defect" || r === "monitor" || r === "no_access";

export function SurveyChecklist({
  surveyId,
  items: initial,
  notes,
  gate,
  locked,
  photos,
  onPhotosChange,
  coverId,
  onCoverChange,
}: {
  surveyId: string;
  items: ChecklistItem[];
  notes: Record<string, string | undefined>;
  gate: { label: string; explain: string } | null;
  locked: boolean;
  photos: PhotoView[];
  onPhotosChange: (next: PhotoView[]) => void;
  coverId: string | null;
  onCoverChange: (id: string | null) => void;
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

  function patch(id: string, p: Partial<Pick<ChecklistItem, "result" | "finding" | "priority" | "recommendation">>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...p } : i)));
    startSaving(async () => {
      const res = await saveSurveyItem(id, surveyId, p);
      setError(res.ok ? null : "A change did not save. Check your signal and try again.");
    });
  }

  function visible(i: ChecklistItem) {
    if (filter === "essential") return i.essential;
    if (filter === "outstanding") return !i.result;
    if (filter === "issues") return isIssue(i.result) || !!i.recommendation;
    return true;
  }

  const blockers = items.filter((i) => i.essential && (i.result === "defect" || i.result === "no_access"));
  const urgent = items.filter((i) => i.priority === "A" && (i.recommendation || i.finding));
  const ready = sum.essentialBlocking === 0;
  const pct = sum.total ? Math.round((sum.answered / sum.total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Sticky progress, section jump and filter */}
      <div className="sticky top-0 z-20 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-lg lg:border lg:px-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-navy transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="shrink-0 text-xs tabular-nums text-slate-600">
            {sum.answered}/{sum.total}
          </span>
          <span className="shrink-0 text-xs text-slate-400">{saving ? "Saving…" : error ? <span className="text-red-600">Not saved</span> : "Saved"}</span>
        </div>
        <div className="mt-2 flex gap-2">
          <select
            className="fm-fld min-w-0 flex-1 !py-1.5 text-sm"
            value=""
            onChange={(e) => {
              document.getElementById(`sec-${sections.indexOf(e.target.value)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            aria-label="Jump to section"
          >
            <option value="">Section…</option>
            {sections.map((s) => {
              const all = items.filter((i) => i.section === s);
              return (
                <option key={s} value={s}>
                  {s} ({all.filter((i) => i.result).length}/{all.length})
                </option>
              );
            })}
          </select>
          <select className="fm-fld !w-32 shrink-0 !py-1.5 text-sm sm:!w-auto" value={filter} onChange={(e) => setFilter(e.target.value as Filter)} aria-label="Filter items">
            <option value="all">All items</option>
            {gate && <option value="essential">Essential only</option>}
            <option value="outstanding">Not checked</option>
            <option value="issues">Defects and recommendations</option>
          </select>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>

      {/* Readiness (gated types) or position summary */}
      {gate ? (
        <div className={`rounded-lg border p-4 ${ready ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}>
          <h2 className="text-base font-semibold text-slate-900">
            {gate.label}: {ready ? "all essential items cleared" : "not yet cleared"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Essential {sum.essentialAnswered}/{sum.essential} checked. {sum.defects} defect{sum.defects === 1 ? "" : "s"}, {sum.monitor} to monitor, {sum.noAccess} not accessed.
          </p>
          {blockers.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {blockers.map((b) => (
                <li key={b.id} className="text-red-800">
                  <span className="font-medium">{b.section}.</span> {b.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-700">
            {sum.defects} defect{sum.defects === 1 ? "" : "s"}, {sum.monitor} to monitor, {sum.noAccess} not accessed, {sum.urgent} urgent recommendation{sum.urgent === 1 ? "" : "s"}.
          </p>
          {urgent.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {urgent.map((u) => (
                <li key={u.id} className="text-red-800">
                  <span className="font-medium">{u.section}.</span> {u.recommendation || u.finding}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {sections.map((section, si) => {
        const rows = items.filter((i) => i.section === section && visible(i));
        const all = items.filter((i) => i.section === section);
        if (rows.length === 0 && filter !== "all") return null;
        const done = all.filter((i) => i.result).length;
        return (
          <section key={section} id={`sec-${si}`} className="scroll-mt-28 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <h3 className="font-semibold text-slate-900">{section}</h3>
              <span className="text-xs tabular-nums text-slate-500">{done}/{all.length}</span>
            </div>
            {notes[section] && <p className="border-b border-slate-100 px-4 py-2 text-sm text-slate-500">{notes[section]}</p>}
            <ul>
              {rows.map((i) => {
                const itemPhotos = photos.filter((p) => p.item_id === i.id);
                const showRec = isIssue(i.result) || !!i.recommendation || !!i.priority;
                return (
                  <li key={i.id} className="border-b border-slate-100 px-4 py-4 last:border-0">
                    <div className="flex gap-2">
                      {gate && (
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-[0.65rem] font-bold ${
                            i.essential ? "bg-navy text-white" : "text-transparent"
                          }`}
                          title={i.essential ? gate.explain : undefined}
                        >
                          E
                        </span>
                      )}
                      <span className="text-[0.95rem] leading-snug text-slate-800">{i.label}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-5 gap-1 sm:flex sm:flex-wrap">
                      {RESULTS.map((r) => {
                        const on = i.result === r.value;
                        return (
                          <button
                            key={r.value}
                            type="button"
                            disabled={locked}
                            onClick={() => patch(i.id, { result: on ? null : r.value })}
                            className={`min-h-11 rounded border px-1 text-xs font-medium transition-colors disabled:cursor-not-allowed sm:min-h-9 sm:px-3 ${
                              on ? RESULT_STYLE[r.value] : "border-slate-300 bg-white text-slate-600 active:bg-slate-100"
                            }`}
                          >
                            {r.label}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      key={`f-${i.id}-${seenIds}`}
                      defaultValue={i.finding ?? ""}
                      disabled={locked}
                      rows={i.finding && i.finding.length > 70 ? 3 : 2}
                      placeholder="Finding"
                      onBlur={(e) => {
                        const v = e.target.value.trim() || null;
                        if (v !== (i.finding ?? null)) patch(i.id, { finding: v });
                      }}
                      className="fm-fld mt-2 resize-y !py-2 text-base sm:text-sm"
                    />

                    {showRec && (
                      <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-2">
                        <div className="grid grid-cols-3 gap-1 sm:flex">
                          {PRIORITIES.map((p) => {
                            const on = i.priority === p.value;
                            return (
                              <button
                                key={p.value}
                                type="button"
                                disabled={locked}
                                title={p.hint}
                                onClick={() => patch(i.id, { priority: on ? null : p.value })}
                                className={`min-h-10 rounded border px-2 text-xs font-medium sm:min-h-8 sm:px-3 ${
                                  on ? PRIORITY_STYLE[p.value] : "border-slate-300 bg-white text-slate-600"
                                }`}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                        <textarea
                          key={`r-${i.id}-${seenIds}`}
                          defaultValue={i.recommendation ?? ""}
                          disabled={locked}
                          rows={2}
                          placeholder="Recommendation"
                          onBlur={(e) => {
                            const v = e.target.value.trim() || null;
                            if (v !== (i.recommendation ?? null)) patch(i.id, { recommendation: v });
                          }}
                          className="fm-fld mt-2 resize-y !py-2 text-base sm:text-sm"
                        />
                      </div>
                    )}

                    <div className="mt-2 flex items-start justify-between gap-2">
                      <SurveyPhotos
                        surveyId={surveyId}
                        itemId={i.id}
                        photos={itemPhotos}
                        onChange={(next) => onPhotosChange([...photos.filter((p) => p.item_id !== i.id), ...next])}
                        coverId={coverId}
                        onCoverChange={onCoverChange}
                        locked={locked}
                        compact
                      />
                      {i.custom && !locked && (
                        <form action={deleteSurveyItem}>
                          <input type="hidden" name="id" value={i.id} />
                          <input type="hidden" name="survey_id" value={surveyId} />
                          <PendingButton variant="danger" className="!min-h-10 !px-3 !py-1.5 text-xs" pendingLabel="…">Remove item</PendingButton>
                        </form>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            {!locked && filter === "all" && (
              <details className="border-t border-slate-100 px-4 py-2">
                <summary className="cursor-pointer py-1 text-sm font-medium text-navy">Add item to {section}</summary>
                <form action={addSurveyItem} className="mt-2 flex flex-col gap-2 pb-2 sm:flex-row sm:items-center">
                  <input type="hidden" name="survey_id" value={surveyId} />
                  <input type="hidden" name="section" value={section} />
                  <input name="label" required placeholder="Item" className="fm-fld flex-1 text-base sm:text-sm" />
                  {gate && (
                    <label className="flex items-center gap-1.5 text-sm text-slate-600">
                      <input type="checkbox" name="essential" /> Essential
                    </label>
                  )}
                  <PendingButton variant="outline" className="!min-h-10">Add</PendingButton>
                </form>
              </details>
            )}
          </section>
        );
      })}

      {!locked && (
        <details className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium text-navy">Add a section</summary>
          <form action={addSurveyItem} className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input type="hidden" name="survey_id" value={surveyId} />
            <input name="section" required placeholder="Section name" className="fm-fld text-base sm:text-sm" />
            <input name="label" required placeholder="First item" className="fm-fld text-base sm:text-sm" />
            <PendingButton variant="outline" className="!min-h-10">Add</PendingButton>
          </form>
        </details>
      )}
    </div>
  );
}
