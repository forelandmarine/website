"use client";

import { useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { PHOTO_BUCKET, makeDisplayCopy } from "@/lib/admin/survey-photos";
import {
  registerSurveyPhoto,
  updateSurveyPhoto,
  deleteSurveyPhoto,
  setCoverPhoto,
  type PhotoView,
} from "@/app/admin/surveys/actions";

const EXT_TYPES: Record<string, string> = { heic: "image/heic", heif: "image/heif", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

// Photo strip for one checklist item (itemId) or one report section (section).
// On a phone the file picker offers the camera as well as the library.
export function SurveyPhotos({
  surveyId,
  itemId = null,
  section = null,
  photos,
  onChange,
  coverId,
  onCoverChange,
  locked,
  compact = false,
}: {
  surveyId: string;
  itemId?: string | null;
  section?: string | null;
  photos: PhotoView[];
  onChange: (next: PhotoView[]) => void;
  coverId: string | null;
  onCoverChange: (id: string | null) => void;
  locked: boolean;
  compact?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<PhotoView | null>(null);

  async function upload(files: FileList) {
    setError(null);
    const sb = getSupabaseBrowser();
    let current = photos;
    for (const file of Array.from(files)) {
      setBusy((b) => b + 1);
      try {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const base = `${surveyId}/${itemId ?? "section"}/${crypto.randomUUID()}`;
        const path = `${base}.${ext}`;
        const contentType = file.type || EXT_TYPES[ext] || "image/jpeg";
        const up = await sb.storage.from(PHOTO_BUCKET).upload(path, file, { contentType, upsert: false });
        if (up.error) throw up.error;
        const copy = await makeDisplayCopy(file);
        let displayPath: string | null = null;
        if (copy) {
          displayPath = `${base}_d.jpg`;
          const d = await sb.storage.from(PHOTO_BUCKET).upload(displayPath, copy.blob, { contentType: "image/jpeg", upsert: false });
          if (d.error) displayPath = null;
        }
        const view = await registerSurveyPhoto({ surveyId, itemId, section, path, displayPath, width: copy?.width ?? null, height: copy?.height ?? null });
        if (!view) throw new Error("not saved");
        current = [...current, view];
        onChange(current);
      } catch {
        setError(`${file.name} did not upload. Check your signal and try again.`);
      } finally {
        setBusy((b) => b - 1);
      }
    }
    if (input.current) input.current.value = "";
  }

  function patch(id: string, p: Partial<PhotoView>) {
    const next = photos.map((x) => (x.id === id ? { ...x, ...p } : x));
    onChange(next);
    setOpen((o) => (o && o.id === id ? { ...o, ...p } : o));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {photos.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(p)}
            className={`relative h-16 w-16 overflow-hidden rounded border bg-slate-100 sm:h-14 sm:w-14 ${p.in_report ? "border-slate-300" : "border-dashed border-slate-300 opacity-60"}`}
            aria-label={p.caption || "Photo"}
          >
            {p.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.url} alt={p.caption ?? ""} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="text-[0.6rem] text-slate-500">HEIC</span>
            )}
            {coverId === p.id && <span className="absolute bottom-0 left-0 right-0 bg-navy/80 text-[0.55rem] text-white">Cover</span>}
          </button>
        ))}
        {!locked && (
          <button
            type="button"
            onClick={() => input.current?.click()}
            className={`inline-flex items-center justify-center rounded border border-dashed border-slate-400 text-slate-600 hover:border-navy hover:text-navy ${
              compact ? "h-10 px-3 text-xs" : "h-16 px-4 text-sm sm:h-14"
            }`}
          >
            {busy > 0 ? `Uploading ${busy}…` : photos.length ? "+ Photo" : "Add photos"}
          </button>
        )}
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && upload(e.target.files)} />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 sm:items-center" onClick={() => setOpen(null)}>
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-white p-4 sm:rounded-xl" onClick={(e) => e.stopPropagation()}>
            {open.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={open.url} alt={open.caption ?? ""} className="mx-auto max-h-[55vh] w-auto rounded" />
            )}
            <label className="mt-3 block">
              <span className="fm-label">Caption</span>
              <input
                className="fm-fld"
                defaultValue={open.caption ?? ""}
                disabled={locked}
                placeholder="e.g. Bow stem damage"
                onBlur={(e) => {
                  const v = e.target.value.trim() || null;
                  if (v !== open.caption) {
                    patch(open.id, { caption: v });
                    updateSurveyPhoto(open.id, surveyId, { caption: v });
                  }
                }}
              />
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="flex min-h-10 items-center gap-2 rounded border border-slate-300 px-3 text-sm">
                <input
                  type="checkbox"
                  checked={open.in_report}
                  disabled={locked}
                  onChange={(e) => {
                    patch(open.id, { in_report: e.target.checked });
                    updateSurveyPhoto(open.id, surveyId, { in_report: e.target.checked });
                  }}
                />
                Include in report
              </label>
              <button
                type="button"
                disabled={locked}
                onClick={() => {
                  const next = coverId === open.id ? null : open.id;
                  onCoverChange(next);
                  setCoverPhoto(surveyId, next);
                }}
                className="min-h-10 rounded border border-slate-300 px-3 text-sm text-slate-700 hover:border-navy"
              >
                {coverId === open.id ? "Remove as cover" : "Use as cover photo"}
              </button>
              {open.fullUrl && (
                <a href={open.fullUrl} target="_blank" rel="noreferrer" className="min-h-10 rounded border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-navy">
                  Original
                </a>
              )}
              {!locked && (
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm("Delete this photo?")) return;
                    const r = await deleteSurveyPhoto(open.id, surveyId);
                    if (r.ok) {
                      onChange(photos.filter((x) => x.id !== open.id));
                      if (coverId === open.id) onCoverChange(null);
                      setOpen(null);
                    }
                  }}
                  className="min-h-10 rounded border border-red-300 px-3 text-sm text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
              <button type="button" onClick={() => setOpen(null)} className="ml-auto min-h-10 rounded bg-navy px-4 text-sm text-white">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
