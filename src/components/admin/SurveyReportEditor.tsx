"use client";

import { useState } from "react";
import type { ReportStyle } from "@/lib/admin/survey-templates";
import type { DraftTarget } from "@/lib/admin/survey-draft";
import {
  saveReportField,
  saveNarrative,
  saveParticulars,
  setConfidential,
  draftReportText,
  type PhotoView,
  type ReportTextField,
} from "@/app/admin/surveys/actions";
import { SurveyPhotos } from "@/components/admin/SurveyPhotos";

type Saver = (value: string | null) => Promise<{ ok: boolean }>;

// A report text box that saves when it loses focus, with an optional
// "Draft with Claude" button. Drafts replace the text only after confirmation.
function TextBlock({
  label,
  hint,
  initial,
  save,
  draft,
  rows = 6,
  locked,
}: {
  label: string;
  hint?: string;
  initial: string | null;
  save: Saver;
  draft?: DraftTarget & { surveyId: string };
  rows?: number;
  locked: boolean;
}) {
  const [value, setValue] = useState(initial ?? "");
  const [saved, setSaved] = useState(initial ?? "");
  const [state, setState] = useState<"idle" | "saving" | "drafting" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function commit(v: string) {
    if (v === saved) return;
    setState("saving");
    const r = await save(v || null);
    if (r.ok) {
      setSaved(v);
      setState("idle");
    } else setState("error");
  }

  async function runDraft() {
    if (!draft) return;
    if (value.trim() && !confirm("Replace the current text with a new draft?")) return;
    setState("drafting");
    setMsg(null);
    const { surveyId, ...target } = draft;
    const r = await draftReportText(surveyId, target as DraftTarget);
    if (r.ok) {
      setValue(r.text);
      setState("idle");
      await commit(r.text);
      setMsg("Draft inserted. Read it through and edit before issuing.");
    } else {
      setState("error");
      setMsg(r.error);
    }
  }

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
        <span className="fm-label !mb-0">{label}</span>
        <span className="text-xs text-slate-400">
          {state === "saving" ? "Saving…" : state === "drafting" ? "Drafting…" : state === "error" ? <span className="text-red-600">Not saved</span> : value !== saved ? "Unsaved" : ""}
        </span>
      </div>
      {hint && <p className="mb-1 text-xs text-slate-500">{hint}</p>}
      <textarea
        className="fm-fld resize-y text-base leading-relaxed sm:text-sm"
        rows={rows}
        value={value}
        disabled={locked || state === "drafting"}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
      />
      {draft && !locked && (
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <button type="button" onClick={runDraft} disabled={state === "drafting"} className="min-h-9 text-sm font-medium text-navy hover:underline disabled:opacity-50">
            {state === "drafting" ? "Drafting…" : value.trim() ? "Redraft with Claude" : "Draft with Claude"}
          </button>
          {msg && <span className="text-xs text-slate-500">{msg}</span>}
        </div>
      )}
    </div>
  );
}

function ParticularsEditor({ surveyId, initial, locked }: { surveyId: string; initial: [string, string][]; locked: boolean }) {
  const [rows, setRows] = useState<[string, string][]>(initial.length ? initial : [["Vessel name", ""]]);
  const [state, setState] = useState<"idle" | "saving" | "error">("idle");
  async function commit(next: [string, string][]) {
    setState("saving");
    const r = await saveParticulars(surveyId, next);
    setState(r.ok ? "idle" : "error");
  }
  const set = (i: number, j: 0 | 1, v: string) => setRows((r) => r.map((row, n) => (n === i ? ((j === 0 ? [v, row[1]] : [row[0], v]) as [string, string]) : row)));
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="fm-label !mb-0">Vessel particulars</span>
        <span className="text-xs text-slate-400">{state === "saving" ? "Saving…" : state === "error" ? "Not saved" : "Rows left blank are left out"}</span>
      </div>
      <div className="space-y-1.5">
        {rows.map(([k, v], i) => (
          <div key={i} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] gap-1.5">
            <input className="fm-fld !py-1.5 text-base sm:text-sm" value={k} disabled={locked} onChange={(e) => set(i, 0, e.target.value)} onBlur={() => commit(rows)} />
            <input className="fm-fld !py-1.5 text-base sm:text-sm" value={v} disabled={locked} onChange={(e) => set(i, 1, e.target.value)} onBlur={() => commit(rows)} />
            <button
              type="button"
              disabled={locked}
              aria-label="Remove row"
              className="min-h-9 px-2 text-slate-400 hover:text-red-600"
              onClick={() => {
                const next = rows.filter((_, n) => n !== i);
                setRows(next);
                commit(next);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {!locked && (
        <button type="button" className="mt-2 min-h-9 text-sm font-medium text-navy" onClick={() => setRows((r) => [...r, ["", ""]])}>
          + Add row
        </button>
      )}
    </div>
  );
}

export function SurveyReportEditor({
  surveyId,
  style,
  sections,
  survey,
  hasValuation,
  photos,
  onPhotosChange,
  coverId,
  onCoverChange,
  locked,
  links,
}: {
  surveyId: string;
  style: ReportStyle;
  sections: { name: string; itemPhotoCount: number }[];
  survey: {
    report_title: string | null;
    intro: string | null;
    description: string | null;
    summary: string | null;
    valuation: string | null;
    outstanding: string | null;
    confidential: boolean;
    narratives: Record<string, string>;
    particulars: [string, string][];
  };
  hasValuation: boolean;
  photos: PhotoView[];
  onPhotosChange: (next: PhotoView[]) => void;
  coverId: string | null;
  onCoverChange: (id: string | null) => void;
  locked: boolean;
  links: React.ReactNode;
}) {
  const [confidential, setConf] = useState(survey.confidential);
  const field = (f: ReportTextField) => (v: string | null) => saveReportField(surveyId, f, v);
  const cover = photos.find((p) => p.id === coverId);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-4">{links}</div>

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">Cover</h3>
        <TextBlock label="Report title" initial={survey.report_title} save={field("report_title")} rows={1} locked={locked} />
        <label className="flex min-h-10 items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={confidential}
            disabled={locked}
            onChange={(e) => {
              setConf(e.target.checked);
              setConfidential(surveyId, e.target.checked);
            }}
          />
          Confidentiality note on the cover (owner and representatives only)
        </label>
        <div>
          <span className="fm-label">Cover photo</span>
          {cover?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.url} alt="" className="max-h-48 rounded border border-slate-200" />
          ) : (
            <p className="text-sm text-slate-500">None chosen. Open any photo and choose "Use as cover photo".</p>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">Opening</h3>
        <TextBlock
          label={style === "site_visit" ? "Update" : style === "insurance" ? "Purpose and scope" : "Introduction"}
          hint="Separate paragraphs with a blank line."
          initial={survey.intro}
          save={field("intro")}
          draft={{ kind: "intro", surveyId }}
          rows={7}
          locked={locked}
        />
        {style === "condition" && (
          <TextBlock label="Vessel description" initial={survey.description} save={field("description")} draft={{ kind: "description", surveyId }} rows={6} locked={locked} />
        )}
        {style !== "site_visit" && <ParticularsEditor surveyId={surveyId} initial={survey.particulars} locked={locked} />}
      </div>

      {sections.map(({ name, itemPhotoCount }) => (
        <div key={name} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-900">{name}</h3>
          <TextBlock
            label="Section text"
            hint={
              style === "insurance"
                ? "Optional opening paragraph. Findings are listed as bullets with the recommendations beneath."
                : "Left blank, the report lists this section's findings as bullets."
            }
            initial={survey.narratives[name] ?? null}
            save={(v) => saveNarrative(surveyId, name, v)}
            draft={{ kind: "section", section: name, surveyId }}
            rows={6}
            locked={locked}
          />
          <div>
            <span className="fm-label">Section photos</span>
            <p className="mb-2 text-xs text-slate-500">
              {itemPhotoCount} photo{itemPhotoCount === 1 ? "" : "s"} attached to checklist items appear here in the report. Add general views of the area below.
            </p>
            <SurveyPhotos
              surveyId={surveyId}
              section={name}
              photos={photos.filter((p) => !p.item_id && p.section === name)}
              onChange={(next) => onPhotosChange([...photos.filter((p) => p.item_id || p.section !== name), ...next])}
              coverId={coverId}
              onCoverChange={onCoverChange}
              locked={locked}
            />
          </div>
        </div>
      ))}

      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">Closing</h3>
        {hasValuation && style !== "site_visit" && (
          <TextBlock label="Valuation" hint="e.g. Estimated fair market value: €55,000, with the basis." initial={survey.valuation} save={field("valuation")} rows={3} locked={locked} />
        )}
        <TextBlock
          label={style === "site_visit" ? "Observations" : style === "insurance" ? "Conclusions" : "Closing summary"}
          initial={survey.summary}
          save={field("summary")}
          draft={{ kind: "summary", surveyId }}
          rows={7}
          locked={locked}
        />
        {style === "site_visit" && (
          <TextBlock
            label="Outstanding items"
            hint="One per line. Open defects and monitor items from the checklist are added automatically."
            initial={survey.outstanding}
            save={field("outstanding")}
            rows={5}
            locked={locked}
          />
        )}
      </div>
    </div>
  );
}
