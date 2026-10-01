import type { ReportBlock, ReportFigure, ReportModel } from "@/lib/admin/survey-report";

// HTML rendering of a survey report in the Foreland document style (design
// system v2.1: navy stripe, Aptos, navy headings, brass bullets, tagline and
// address footer, page numbers). Used by the admin preview and the client link.
// Printing relies on Chrome/Safari @page margin boxes for the footer.

const CSS = `
.svr { --ink:#222; --muted:#555; --light:#888; --navy:#14315f; --stripe:#033269; --brass:#94703a; --rule:#d0d0d0;
  color:var(--ink); font-family:"Aptos","Aptos Display","Calibri",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
  line-height:1.55; -webkit-font-smoothing:antialiased; }
.svr-paper { background:#fff; max-width:210mm; margin:0 auto; padding:14mm 22mm 18mm 26mm; border-left:6.5mm solid var(--stripe); box-shadow:0 1mm 3mm rgba(0,0,0,.08); }
.svr-logo { text-align:right; margin-bottom:6mm; }
.svr-logo img { width:53mm; height:auto; display:inline-block; }
.svr h1 { font-size:34pt; font-weight:700; color:var(--navy); margin:22mm 0 3mm; line-height:1.1; }
.svr .svr-cover-sub { font-size:18pt; color:var(--navy); margin:0 0 8mm; font-weight:500; }
.svr .svr-cover-meta { border-left:3pt solid var(--navy); padding-left:6mm; font-size:11pt; margin:6mm 0 10mm; }
.svr .svr-cover-meta p { margin:0 0 1.5mm; }
.svr .svr-conf { border:0.4pt solid var(--rule); border-left:3pt solid var(--navy); padding:4mm 5mm; font-size:9.5pt; color:var(--muted); margin-top:12mm; }
.svr h2 { font-size:13pt; color:var(--navy); margin:9mm 0 4mm; font-weight:600; border-bottom:0.4pt solid var(--navy); padding-bottom:1.5mm; break-after:avoid; }
.svr p { margin:0 0 4.5mm; font-size:10.5pt; hyphens:none; text-align:left; }
.svr ul.svr-b { margin:2mm 0 5mm; padding-left:4mm; font-size:10.5pt; }
.svr ul.svr-b li { list-style:none; position:relative; padding-left:5mm; margin-bottom:2mm; }
.svr ul.svr-b li::before { content:""; position:absolute; left:0; top:2.4mm; width:1.5mm; height:1.5mm; background:var(--brass); }
.svr .svr-rec { font-size:10.5pt; margin:0 0 5mm; }
.svr .svr-rec strong { color:var(--navy); }
.svr table.svr-pg { width:100%; border-collapse:collapse; margin:0; break-inside:auto; }
.svr table.svr-pg > * > tr > td { padding:0; border:0; background:transparent; }
.svr table:not(.svr-pg) { width:100%; border-collapse:collapse; font-size:9.5pt; margin:3mm 0 6mm; break-inside:avoid; }
.svr table:not(.svr-pg) th { background:var(--navy); color:#fff; padding:2.2mm 3mm; text-align:left; font-weight:500; }
.svr table:not(.svr-pg) td { padding:2.2mm 3mm; border-bottom:0.3pt solid var(--rule); vertical-align:top; }
.svr table.kv th { background:transparent; color:var(--muted); font-weight:500; width:55mm; border-bottom:0.4pt solid var(--rule); padding-left:0; }
.svr table.kv td { border-bottom:0.4pt solid var(--rule); }
.svr .svr-figs { display:grid; gap:5mm; margin:4mm 0 7mm; }
.svr .svr-figs.two { grid-template-columns:1fr 1fr; }
.svr figure { margin:0; text-align:center; break-inside:avoid; }
.svr figure img { max-width:100%; max-height:110mm; width:auto; height:auto; display:inline-block; }
.svr .svr-figs.two figure img { max-height:72mm; }
.svr figcaption { font-style:italic; font-size:9.5pt; color:var(--muted); margin-top:1.5mm; }
.svr figcaption b { color:var(--ink); }
.svr .svr-cover-fig img { max-height:120mm; }
.svr .svr-sig { margin:10mm 0 6mm; font-size:10.5pt; }
.svr .svr-sig p { margin:0 0 1mm; }
.svr .svr-break { break-before:page; }
.svr .svr-head { display:flex; justify-content:space-between; gap:6mm; align-items:flex-start; }
@media (max-width: 640px) {
  .svr-paper { padding:8mm 5mm 10mm 7mm; border-left-width:3mm; }
  .svr h1 { font-size:24pt; margin-top:8mm; }
  .svr .svr-cover-sub { font-size:14pt; }
  .svr .svr-figs.two { grid-template-columns:1fr; }
  .svr table.kv th { width:38%; }
  .svr-logo img { width:40mm; }
}
@media print {
  /* Stripe drawn with left margin boxes; the logo repeats through the table header. */
  @page { size:A4 portrait; margin:12mm 0 24mm 6.5mm;
    @top-left-corner { content:""; background:#033269; }
    @left-top { content:""; background:#033269; }
    @left-middle { content:""; background:#033269; }
    @left-bottom { content:""; background:#033269; }
    @bottom-left-corner { content:""; background:#033269; }
    @bottom-center { content:"Smooth sailing, every time.\\A www.forelandmarine.com    7 Bell Yard, London WC2A 2JR    Co. No. 15785851"; white-space:pre; font:8pt "Aptos","Calibri",sans-serif; color:#555; }
    @bottom-right { content:counter(page) " / " counter(pages); font:8pt "Aptos","Calibri",sans-serif; color:#888; padding-right:22mm; }
  }
  body { background:#fff !important; }
  .svr-paper { max-width:none; margin:0; padding:0; border:0; box-shadow:none; }
  .svr table.svr-pg > * > tr > td { padding:0 22mm 0 19.5mm; }
  .svr-logo { margin-bottom:4mm; }
  .svr h1 { margin-top:24mm; }
  .svr .svr-sig { break-inside:avoid; }
  /* Keep the signature with the paragraph above it. */
  .svr p:has(+ .svr-sig) { break-after:avoid; }
}
`;

function Figures({ figures, url }: { figures: ReportFigure[]; url: (f: ReportFigure) => string | null }) {
  const rows: ReportFigure[][] = [];
  for (let i = 0; i < figures.length; i += 2) rows.push(figures.slice(i, i + 2));
  return (
    <>
      {rows.map((row) => (
        <div key={row[0].n} className={`svr-figs ${row.length === 2 ? "two" : ""}`}>
          {row.map((f) => {
            const src = url(f);
            return (
              <figure key={f.n}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {src ? <img src={src} alt={f.caption} loading="eager" /> : <div style={{ padding: "10mm", border: "0.4pt dashed #bbb" }}>Photo not viewable</div>}
                <figcaption>
                  <b>Figure {f.n}.</b> {f.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      ))}
    </>
  );
}

function Block({ b, url }: { b: ReportBlock; url: (f: ReportFigure) => string | null }) {
  switch (b.kind) {
    case "para":
      return <p>{b.text}</p>;
    case "bullets":
      return (
        <ul className="svr-b">
          {b.items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      );
    case "recommendation":
      return (
        <p className="svr-rec">
          <strong>Recommendation:</strong> {b.text}
        </p>
      );
    case "figures":
      return <Figures figures={b.figures} url={url} />;
    case "particulars":
      return (
        <table className="kv">
          <tbody>
            {b.rows.map(([k, v]) => (
              <tr key={k}>
                <th>{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "recommendations":
      return (
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>Action</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i}>
                <td>{r.area}</td>
                <td>{r.action}</td>
                <td>{r.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "signature":
      return (
        <div className="svr-sig">
          <p>
            <strong>{b.name}</strong>
          </p>
          <p>{b.company}</p>
          {b.date && <p>{b.date}</p>}
        </div>
      );
  }
}

export function SurveyReportView({ model, url }: { model: ReportModel; url: (f: ReportFigure) => string | null }) {
  const m = model;
  return (
    <div className="svr">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="svr-paper">
        {/* A table so the logo header repeats on every printed page. */}
        <table className="svr-pg">
          <thead>
            <tr>
              <td>
                <div className="svr-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logos/foreland-marine-color.png" alt="Foreland Marine" />
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>

        {m.style === "insurance" ? (
          // Storm Petrel format: title and key details at the head of page one.
          <>
            <h1 style={{ fontSize: "22pt", marginTop: "4mm" }}>{m.reportTitle}</h1>
            <table className="kv">
              <tbody>
                {(
                  [
                    ["Vessel name", m.vesselName],
                    ["Surveyor", m.surveyor],
                    ["Date of survey", m.dateText],
                    ["Location", m.location],
                    ["Report", m.number],
                  ] as [string, string][]
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <tr key={k}>
                      <th>{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1>{m.reportTitle}</h1>
            <p className="svr-cover-sub">{m.vesselName}</p>
            <div className="svr-cover-meta">
              {m.location && <p>{m.location}</p>}
              {m.dateText && <p>{m.dateText}</p>}
              <p style={{ marginTop: "4mm" }}>
                <strong>{m.surveyor}</strong>
              </p>
              <p>{m.company}</p>
            </div>
            {m.style === "condition" && m.coverFigure && (
              <div className="svr-cover-fig">
                <Figures figures={[m.coverFigure]} url={url} />
              </div>
            )}
            {m.confidential && <div className="svr-conf">{m.confidentialityNote}</div>}
            {m.style === "condition" && m.particulars.length > 0 && (
              <div className="svr-break">
                <h2>Vessel particulars</h2>
                <Block b={{ kind: "particulars", rows: m.particulars }} url={url} />
              </div>
            )}
          </>
        )}

        {m.sections.map((s, i) => (
          <section key={i} className={i === 0 && m.style !== "insurance" ? "svr-break" : undefined}>
            <h2>{s.number ? `${s.number}. ${s.heading}` : s.heading}</h2>
            {s.blocks.map((b, j) => (
              <Block key={j} b={b} url={url} />
            ))}
          </section>
        ))}

        {m.disclaimer && (
          <section className="svr-break">
            <h2>{m.disclaimer.heading}</h2>
            {m.disclaimer.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "9.5pt", color: "#555" }}>
                {p}
              </p>
            ))}
          </section>
        )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
