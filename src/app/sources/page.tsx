import { subjects, inventory } from "@/content";

const CHIP = { used: ["ok", "In the app"], awaiting: ["acc", "Awaiting upload"], unusable: ["", "Not usable"], missing: ["", "Not found"] } as const;

export default function Sources() {
  return (
    <div className="stack" style={{ maxWidth: 1000 }}>
      <div><div className="eyebrow">Source library</div><h1>Sources and coverage</h1>
        <p className="muted">The original two papers retain their textbook citations. The two new papers use concise original syllabus notes and separately labelled PDF-index reading suggestions. See Syllabus coverage for gaps and ambiguities.</p>
      </div>

      <div className="card table-wrap">
        <h2 style={{ marginBottom: 8 }}>Source inventory</h2>
        <table>
          <thead><tr><th>Paper</th><th>Source</th><th>Status</th></tr></thead>
          <tbody>
            {inventory.map((r) => (
              <tr key={r.source}><td className="small">{r.paper}</td><td><strong>{r.source}</strong><div className="small muted">{r.note}</div></td><td><span className={`chip ${CHIP[r.status][0]}`}>{CHIP[r.status][1]}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {subjects.map((s) => (
        <div key={s.id} className="card table-wrap">
          <div className="eyebrow">{s.paper}</div>
          <h2 style={{ marginBottom: 8 }}>Coverage: {s.name} ({s.short})</h2>
          <table>
            <thead><tr><th>Ch</th><th>Title</th><th>Part / approach</th><th>Pages</th><th>Status</th><th>Sections · terms · questions</th></tr></thead>
            <tbody>
              {s.outline.map((o) => {
                const c = s.chapters.find((x) => x.number === o.number);
                return (
                  <tr key={o.number}>
                    <td>{o.number}</td><td>{o.title}</td><td className="small">{o.approach}</td><td className="src" style={{ whiteSpace: "nowrap" }}>{o.pages[0] === 0 ? "Study notes" : `pp. ${o.pages[0]}–${o.pages[1]}`}</td>
                    <td>{c ? <span className="chip ok">{o.pages[0] === 0 ? "Study guide · source suggestions" : "Written, page refs validated"}</span> : <span className="chip">Pending</span>}</td>
                    <td className="small">{c ? `${c.sections.length} · ${c.terms.length} · ${c.checks.length + c.assessment.length + c.practice.length}` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

      <div className="sunk small">
        <strong>Copyright.</strong> The textbooks are copyrighted by their publishers. This app holds original summaries and questions with page references, plus a bounded server-side collection of extracted passages used by the tutor. Keep the deployment private and use your own copies for full reading. Items marked “supplementary” are everyday examples added to aid understanding; they are not from the textbooks.
      </div>
    </div>
  );
}
