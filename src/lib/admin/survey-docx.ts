// Word export of a survey report. The document is built on Foreland's own
// letterhead.docx (docx-template/), so the header logo, navy stripe, footer,
// margins and base styles come from the template; only the body is generated.
// Body formatting follows the hand-edited K50-018 site visit report: Aptos 11pt
// black, bold section headings, centred photos with an italic caption whose
// "Figure N." prefix is bold italic, and photo pairs set side by side in a
// borderless two-column table.

import { readFile } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import type { ReportBlock, ReportFigure, ReportModel } from "./survey-report";

export type LoadedImage = { data: Uint8Array; width: number; height: number; ext: "jpeg" | "png" };

const TEMPLATE = path.join(process.cwd(), "src/lib/admin/docx-template/letterhead.docx");

const EMU_PER_CM = 360000;
// Text column is 9406 twips (16.6cm); photos sit inside it.
const SINGLE_MAX_W = 15 * EMU_PER_CM;
const PAIR_MAX_W = 7.4 * EMU_PER_CM;
const MAX_H = 11 * EMU_PER_CM;
const COVER_MAX_H = 8.5 * EMU_PER_CM;
const BULLET_NUM_ID = 18; // letterhead numbering: plain "•" bullet

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    // Strip characters XML 1.0 does not allow.
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}

type RunOpts = { b?: boolean; i?: boolean; sz?: number; color?: string };

function run(text: string, o: RunOpts = {}): string {
  const rpr =
    `<w:rFonts w:ascii="Aptos" w:hAnsi="Aptos" w:cs="Aptos"/>` +
    (o.b ? "<w:b/>" : "") +
    (o.i ? "<w:i/>" : "") +
    `<w:color w:val="${o.color ?? "000000"}"/>` +
    `<w:sz w:val="${o.sz ?? 22}"/><w:szCs w:val="${o.sz ?? 22}"/>`;
  return `<w:r><w:rPr>${rpr}</w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
}

function para(runs: string, ppr = ""): string {
  return `<w:p>${ppr ? `<w:pPr>${ppr}</w:pPr>` : ""}${runs}</w:p>`;
}

const empty = () => "<w:p/>";
const pageBreak = () => `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;

function heading(text: string): string {
  return para(run(text, { b: true }), `<w:keepNext/><w:spacing w:before="240"/><w:outlineLvl w:val="0"/>`);
}

function bullets(items: string[]): string {
  return items
    .map((t) => para(run(t), `<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="${BULLET_NUM_ID}"/></w:numPr>`))
    .join("");
}

const CELL_PPR = `<w:spacing w:before="40" w:after="40" w:line="260" w:lineRule="auto"/>`;

function cell(content: string, widthTw: number, opts: { fill?: string; border?: boolean } = {}): string {
  const borders = opts.border
    ? `<w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="D0D0D0"/></w:tcBorders>`
    : "";
  const shd = opts.fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${opts.fill}"/>` : "";
  return `<w:tc><w:tcPr><w:tcW w:w="${widthTw}" w:type="dxa"/>${borders}${shd}</w:tcPr>${content}</w:tc>`;
}

function table(cols: number[], rows: string[], header = false): string {
  const grid = cols.map((w) => `<w:gridCol w:w="${w}"/>`).join("");
  const look = header ? `<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>` : "";
  return (
    `<w:tbl><w:tblPr><w:tblW w:w="${cols.reduce((a, b) => a + b, 0)}" w:type="dxa"/>` +
    `<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="85" w:type="dxa"/><w:right w:w="85" w:type="dxa"/></w:tblCellMar>${look}</w:tblPr>` +
    `<w:tblGrid>${grid}</w:tblGrid>${rows.join("")}</w:tbl>` +
    empty()
  );
}

function particularsTable(rows: [string, string][]): string {
  const cols = [3000, 6400];
  return table(
    cols,
    rows.map(
      ([k, v]) =>
        `<w:tr><w:trPr><w:cantSplit/></w:trPr>` +
        cell(para(run(k, { color: "555555", sz: 20 }), CELL_PPR), cols[0], { border: true }) +
        cell(para(run(v, { sz: 20 }), CELL_PPR), cols[1], { border: true }) +
        `</w:tr>`,
    ),
  );
}

function recommendationsTable(rows: { area: string; action: string; priority: string }[]): string {
  const cols = [2300, 5700, 1400];
  const head =
    `<w:tr><w:trPr><w:cantSplit/><w:tblHeader/></w:trPr>` +
    ["Area", "Action", "Priority"]
      .map((h, i) => cell(para(run(h, { b: true, color: "FFFFFF", sz: 18 }), CELL_PPR), cols[i], { fill: "14315F" }))
      .join("") +
    `</w:tr>`;
  const body = rows.map(
    (r) =>
      `<w:tr><w:trPr><w:cantSplit/></w:trPr>` +
      cell(para(run(r.area, { sz: 19 }), CELL_PPR), cols[0], { border: true }) +
      cell(para(run(r.action, { sz: 19 }), CELL_PPR), cols[1], { border: true }) +
      cell(para(run(r.priority, { sz: 19, b: r.priority === "Urgent" }), CELL_PPR), cols[2], { border: true }) +
      `</w:tr>`,
  );
  return table(cols, [head, ...body], true);
}

// ── Images ──────────────────────────────────────────────────────────────────

type Media = { rId: string; name: string; img: LoadedImage };

class MediaStore {
  items: Media[] = [];
  private next = 100;
  private docPr = 1000;
  add(img: LoadedImage): Media {
    const id = this.next++;
    const m = { rId: `rId${id}`, name: `survey_fig_${id}.${img.ext}`, img };
    this.items.push(m);
    return m;
  }
  docPrId() {
    return this.docPr++;
  }
}

function fit(img: LoadedImage, maxW: number, maxH: number): [number, number] {
  const w = img.width || 4;
  const h = img.height || 3;
  const scale = Math.min(maxW / w, maxH / h);
  return [Math.round(w * scale), Math.round(h * scale)];
}

function drawing(m: Media, cx: number, cy: number, id: number): string {
  return (
    `<w:r><w:rPr><w:noProof/></w:rPr><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">` +
    `<wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>` +
    `<wp:docPr id="${id}" name="Picture ${id}"/>` +
    `<wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr>` +
    `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="${m.name}"/><pic:cNvPicPr/></pic:nvPicPr>` +
    `<pic:blipFill><a:blip r:embed="${m.rId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>` +
    `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic>` +
    `</a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`
  );
}

function caption(prefix: string, text: string): string {
  const runs = run(prefix + (text ? " " : ""), { b: true, i: true, sz: 18 }) + (text ? run(text, { i: true, sz: 18 }) : "");
  return para(runs, `<w:jc w:val="center"/>`);
}

type Loaded = { fig: ReportFigure; media: Media };

function singleFigure(l: Loaded, store: MediaStore, maxH = MAX_H): string {
  const [cx, cy] = fit(l.media.img, SINGLE_MAX_W, maxH);
  return (
    para(drawing(l.media, cx, cy, store.docPrId()), `<w:keepNext/><w:spacing w:after="60"/><w:jc w:val="center"/>`) +
    caption(`Figure ${l.fig.n}.`, l.fig.caption)
  );
}

function pairFigure(a: Loaded, b: Loaded, store: MediaStore): string {
  const cols = [4703, 4703];
  // Both photos share a height so the pair reads as one row.
  const [, ha] = fit(a.media.img, PAIR_MAX_W, MAX_H);
  const [, hb] = fit(b.media.img, PAIR_MAX_W, MAX_H);
  const h = Math.min(ha, hb);
  const sized = (l: Loaded) => {
    const [w] = fit(l.media.img, PAIR_MAX_W, h);
    const [cw, ch] = fit(l.media.img, w, h);
    return para(drawing(l.media, cw, ch, store.docPrId()), `<w:keepNext/><w:spacing w:after="0"/><w:jc w:val="center"/>`);
  };
  const tbl =
    `<w:tbl><w:tblPr><w:tblW w:w="9406" w:type="dxa"/><w:jc w:val="center"/><w:tblLayout w:type="fixed"/>` +
    `<w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders>` +
    `</w:tblPr><w:tblGrid>${cols.map((w) => `<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>` +
    `<w:tr><w:trPr><w:cantSplit/></w:trPr>${cell(sized(a), cols[0])}${cell(sized(b), cols[1])}</w:tr></w:tbl>`;
  const capText = [a.fig.caption && `Left: ${a.fig.caption}`, b.fig.caption && `Right: ${b.fig.caption}`]
    .filter(Boolean)
    .join(". ");
  return tbl + para("", `<w:keepNext/><w:spacing w:after="0"/>`) + caption(`Figures ${a.fig.n} and ${b.fig.n}.`, capText);
}

// ── Document body ───────────────────────────────────────────────────────────

export async function buildSurveyDocx(
  model: ReportModel,
  loadImage: (fig: ReportFigure) => Promise<LoadedImage | null>,
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(await readFile(TEMPLATE));
  const store = new MediaStore();

  // Load every figure up front, in parallel; figures that cannot be loaded are dropped.
  const allFigs: ReportFigure[] = [
    ...(model.coverFigure ? [model.coverFigure] : []),
    ...model.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === "figures" ? b.figures : []))),
  ];
  const loaded = new Map<string, Loaded>();
  await Promise.all(
    allFigs.map(async (fig) => {
      const img = await loadImage(fig).catch(() => null);
      if (img) loaded.set(fig.photoId, { fig, media: { rId: "", name: "", img } });
    }),
  );
  // Register media in report order so part names follow the figure numbers.
  for (const fig of allFigs) {
    const l = loaded.get(fig.photoId);
    if (l) l.media = store.add(l.media.img);
  }

  const out: string[] = [];

  // Cover. Tight spacing so a cover photo, the surveyor and the
  // confidentiality note all fit on the first page.
  const cv = (r: string, after = 120) => para(r, `<w:spacing w:after="${after}"/>`);
  out.push(empty());
  out.push(cv(run(model.reportTitle, { b: true, sz: 52 }), 480));
  out.push(cv(run(model.vesselName, { b: true, sz: 32 })));
  if (model.location) out.push(cv(run(model.location, { sz: 32 }), 240));
  if (model.dateText) out.push(cv(run(model.dateText), 360));
  // Site visit reports carry the cover photo under the Update heading instead.
  const coverFig = model.style !== "site_visit" && model.coverFigure ? loaded.get(model.coverFigure.photoId) : undefined;
  if (coverFig) out.push(singleFigure(coverFig, store, COVER_MAX_H), cv("", 240));
  else out.push(empty(), empty(), empty(), empty(), empty(), empty());
  if (model.surveyor) out.push(cv(run(model.surveyor), 0));
  out.push(cv(run(model.company), 360));
  if (model.confidential) out.push(cv(run(model.confidentialityNote, { sz: 18 })));
  out.push(pageBreak());

  // Condition format: particulars on their own page after the cover.
  if (model.style === "condition" && model.particulars.length) {
    out.push(heading("Vessel particulars"), particularsTable(model.particulars), pageBreak());
  }

  for (const s of model.sections) {
    out.push(heading(s.number != null ? `${s.number}. ${s.heading}` : s.heading));
    s.blocks.forEach((b, i) => {
      // Keep the closing line with the signature beneath it.
      const keep = s.blocks[i + 1]?.kind === "signature";
      out.push(keep && b.kind === "para" ? para(run(b.text), "<w:keepNext/>") : renderBlock(b, loaded, store));
    });
  }

  if (model.closingLine) out.push(para(run(model.closingLine)));

  if (model.disclaimer) {
    out.push(pageBreak(), heading(model.disclaimer.heading));
    for (const p of model.disclaimer.paragraphs) out.push(para(run(p, { sz: 20 })));
  }

  // Splice the body into the template, keeping its final sectPr (header/footer refs, margins).
  const docPath = "word/document.xml";
  const doc = await zip.file(docPath)!.async("string");
  const bodyStart = doc.indexOf("<w:body>") + "<w:body>".length;
  const sectStart = doc.lastIndexOf("<w:sectPr");
  zip.file(docPath, doc.slice(0, bodyStart) + out.join("") + doc.slice(sectStart));

  // Media parts and relationships
  const relsPath = "word/_rels/document.xml.rels";
  let rels = await zip.file(relsPath)!.async("string");
  const relXml = store.items
    .map((m) => `<Relationship Id="${m.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${m.name}"/>`)
    .join("");
  rels = rels.replace("</Relationships>", relXml + "</Relationships>");
  zip.file(relsPath, rels);
  for (const m of store.items) zip.file(`word/media/${m.name}`, m.img.data);

  let types = await zip.file("[Content_Types].xml")!.async("string");
  if (!/Extension="jpeg"/i.test(types)) types = types.replace("<Default ", `<Default Extension="jpeg" ContentType="image/jpeg"/><Default `);
  if (!/Extension="png"/i.test(types)) types = types.replace("<Default ", `<Default Extension="png" ContentType="image/png"/><Default `);
  zip.file("[Content_Types].xml", types);

  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

function renderBlock(b: ReportBlock, loaded: Map<string, Loaded>, store: MediaStore): string {
  switch (b.kind) {
    case "para":
      return para(run(b.text));
    case "bullets":
      return bullets(b.items) + empty();
    case "recommendation":
      return para(run("Recommendation: ", { b: true }) + run(b.text));
    case "particulars":
      return particularsTable(b.rows);
    case "recommendations":
      return recommendationsTable(b.rows);
    case "signature":
      return (
        para("", "<w:keepNext/>") +
        para(run(b.name), `<w:keepNext/><w:spacing w:after="0"/>`) +
        para(run(b.company), `<w:keepNext/><w:spacing w:after="0"/>`) +
        para(run(b.date))
      );
    case "figures": {
      const figs = b.figures.map((f) => loaded.get(f.photoId)).filter((l): l is Loaded => !!l);
      const parts: string[] = [];
      for (let i = 0; i < figs.length; i += 2) {
        parts.push(i + 1 < figs.length ? pairFigure(figs[i], figs[i + 1], store) : singleFigure(figs[i], store));
        parts.push(empty());
      }
      return parts.join("");
    }
  }
}

// ── Image dimensions (no native deps) ──────────────────────────────────────

export function imageInfo(data: Uint8Array): { ext: "jpeg" | "png"; width: number; height: number } | null {
  if (data.length > 24 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47) {
    const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
    return { ext: "png", width: dv.getUint32(16), height: dv.getUint32(20) };
  }
  if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
    let i = 2;
    while (i + 9 < data.length) {
      if (data[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = data[i + 1];
      const len = (data[i + 2] << 8) | data[i + 3];
      // SOF0-SOF15 except DHT (C4), JPG (C8), DAC (CC)
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const height = (data[i + 5] << 8) | data[i + 6];
        const width = (data[i + 7] << 8) | data[i + 8];
        return { ext: "jpeg", width, height };
      }
      i += 2 + len;
    }
    return { ext: "jpeg", width: 0, height: 0 };
  }
  return null;
}
