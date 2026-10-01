"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { ReportStyle } from "@/lib/admin/survey-templates";
import type { PhotoView } from "@/app/admin/surveys/actions";
import { SurveyChecklist, type ChecklistItem } from "@/components/admin/SurveyChecklist";
import { SurveyReportEditor } from "@/components/admin/SurveyReportEditor";

type Tab = "checklist" | "report" | "details";

export function SurveyWorkspace(props: {
  surveyId: string;
  items: ChecklistItem[];
  notes: Record<string, string | undefined>;
  gate: { label: string; explain: string } | null;
  style: ReportStyle;
  hasValuation: boolean;
  locked: boolean;
  photos: PhotoView[];
  coverId: string | null;
  report: Parameters<typeof SurveyReportEditor>[0]["survey"];
  reportLinks: ReactNode;
  details: ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("checklist");
  const [photos, setPhotos] = useState(props.photos);
  const [coverId, setCoverId] = useState(props.coverId);

  // Remember the open tab across reloads (server actions revalidate the page).
  useEffect(() => {
    const h = window.location.hash.slice(1) as Tab;
    if (h === "report" || h === "details") setTab(h);
  }, []);
  function go(t: Tab) {
    setTab(t);
    history.replaceState(null, "", `#${t}`);
  }

  const sections: string[] = [];
  for (const i of props.items) if (!sections.includes(i.section)) sections.push(i.section);
  const itemSection = new Map(props.items.map((i) => [i.id, i.section]));

  const tabs: [Tab, string][] = [
    ["checklist", "Checklist"],
    ["report", "Report"],
    ["details", "Details"],
  ];

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-slate-200 p-1 lg:inline-grid lg:w-auto print:hidden" role="tablist">
        {tabs.map(([t, label]) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => go(t)}
            className={`min-h-10 rounded-md px-4 text-sm font-medium ${tab === t ? "bg-white text-navy shadow-sm" : "text-slate-600"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div hidden={tab !== "checklist"}>
        <SurveyChecklist
          surveyId={props.surveyId}
          items={props.items}
          notes={props.notes}
          gate={props.gate}
          locked={props.locked}
          photos={photos}
          onPhotosChange={setPhotos}
          coverId={coverId}
          onCoverChange={setCoverId}
        />
      </div>
      <div hidden={tab !== "report"}>
        <SurveyReportEditor
          surveyId={props.surveyId}
          style={props.style}
          sections={sections.map((name) => ({ name, itemPhotoCount: photos.filter((p) => p.item_id && itemSection.get(p.item_id) === name).length }))}
          survey={props.report}
          hasValuation={props.hasValuation}
          photos={photos}
          onPhotosChange={setPhotos}
          coverId={coverId}
          onCoverChange={setCoverId}
          locked={props.locked}
          links={props.reportLinks}
        />
      </div>
      <div hidden={tab !== "details"}>{props.details}</div>
    </div>
  );
}
