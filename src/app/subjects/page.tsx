import Link from "next/link";
import { subjects } from "@/content";

export default function Subjects() {
  const papers = [...new Set(subjects.map((s) => s.paper))];
  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Subjects</div>
        <h1>Papers and textbooks</h1>
        <p className="muted">Each paper is studied from its prescribed textbooks. Chapters marked Pending aren&apos;t written yet; the Source library says why.</p>
      </div>
      {papers.map((paper) => (
        <section key={paper} style={{ marginTop: 10 }}>
          <h2 style={{ fontSize: "1.6rem" }}>{paper}</h2>
          {subjects.filter((s) => s.paper === paper).map((s) => {
            const groups = [...new Set(s.outline.map((o) => o.approach))];
            return (
              <div key={s.id} style={{ marginTop: 12 }}>
                <p className="muted small">{s.source.author}, <em>{s.source.title}</em>, {s.source.publisher}, {s.source.year} · {s.chapters.length}/{s.outline.length} chapters ready</p>
                {groups.map((g) => (
                  <div key={g}>
                    <h3 style={{ margin: "14px 0 8px" }}>{g}</h3>
                    <div className="grid">
                      {s.outline.filter((o) => o.approach === g).map((o) => {
                        const ready = s.chapters.some((c) => c.number === o.number);
                        return (
                          <Link key={o.number} href={ready ? `/read/${s.id}/${o.number}` : "/sources"} className="card" style={{ textDecoration: "none", opacity: ready ? 1 : 0.6 }}>
                            <div className="row" style={{ justifyContent: "space-between" }}>
                              <span className="eyebrow">{s.short} · Chapter {o.number}</span>
                              <span className={`chip ${ready ? "ok" : ""}`}>{ready ? "Ready" : "Pending"}</span>
                            </div>
                            <h3 style={{ margin: "6px 0" }}>{o.title}</h3>
                            <span className="src">{o.pages[0] === 0 ? "Syllabus study notes · source suggestions inside" : `${s.short} pp. ${o.pages[0]}–${o.pages[1]}`}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
