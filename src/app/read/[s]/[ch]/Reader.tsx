"use client";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import type { Chapter, SubjectMeta } from "@/content/types";
import { update, useProgress, sectionKey, type Mode } from "@/lib/progress";
import { Mcq, Src, Bar, SrcName } from "@/components/ui";

const MODES: [Mode, string][] = [["read", "Detailed"], ["simple", "Simplified"], ["practice", "Practice"], ["revise", "Revision"]];

// Wraps saved highlight strings in <mark>.
function marked(text: string, hl: string[]): ReactNode {
  if (!hl.length) return text;
  const esc = hl.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${esc.join("|")})`, "g")).map((part, i) => (hl.includes(part) ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>));
}

export default function Reader({ c, subject, prev, next }: { c: Chapter; subject: SubjectMeta; prev: number | null; next: number | null }) {
  const s = useProgress();
  const [mode, setMode] = useState<Mode>("read");
  const [current, setCurrent] = useState<string | undefined>();
  const [sel, setSel] = useState<{ text: string; sectionId: string } | null>(null);
  const [tocOpen, setTocOpen] = useState(true);
  useEffect(() => { if (matchMedia("(max-width: 860px)").matches) setTocOpen(false); }, []);
  const restored = useRef(false);

  // Restore the last mode for this chapter once.
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    if (s.last?.ch === c.uid) setMode(s.last.mode);
  }, [s.last, c.uid]);

  // Track which section is on screen; remember it as "last place".
  useEffect(() => {
    const els = c.sections.map((x) => document.getElementById(x.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => {
      const top = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (top) setCurrent(top.target.id);
    }, { rootMargin: "-20% 0px -60% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [c, mode]);
  useEffect(() => { update((st) => ({ ...st, last: { ch: c.uid, sectionId: current, mode } })); }, [current, mode, c.uid]);

  // Offer "Highlight" when text is selected inside a section.
  useEffect(() => {
    const onUp = () => {
      const w = window.getSelection(); const text = w?.toString().trim() ?? "";
      const node = w?.anchorNode?.parentElement?.closest("[data-sec]") as HTMLElement | null;
      setSel(text.length > 3 && text.length < 400 && node ? { text, sectionId: node.dataset.sec! } : null);
    };
    document.addEventListener("mouseup", onUp); document.addEventListener("touchend", onUp);
    return () => { document.removeEventListener("mouseup", onUp); document.removeEventListener("touchend", onUp); };
  }, []);

  const isRead = (id: string) => !!s.read[sectionKey(c.uid, id)];
  const toggleRead = (id: string) => update((st) => {
    const read = { ...st.read }; const k = sectionKey(c.uid, id);
    if (read[k]) delete read[k]; else read[k] = true;
    return { ...st, read };
  });
  const isMarked = (id: string) => s.bookmarks.some((b) => b.ch === c.uid && b.sectionId === id);
  const toggleMark = (id: string) => update((st) => ({
    ...st, bookmarks: isMarked(id) ? st.bookmarks.filter((b) => !(b.ch === c.uid && b.sectionId === id)) : [...st.bookmarks, { ch: c.uid, sectionId: id, at: Date.now() }],
  }));
  const saveHighlight = () => {
    if (!sel) return;
    update((st) => ({ ...st, highlights: [...st.highlights, { ch: c.uid, sectionId: sel.sectionId, text: sel.text, at: Date.now() }] }));
    window.getSelection()?.removeAllRanges(); setSel(null);
  };
  const hlFor = (id: string) => s.highlights.filter((h) => h.ch === c.uid && h.sectionId === id).map((h) => h.text);
  const done = c.sections.filter((x) => isRead(x.id)).length;

  return (
    <SrcName.Provider value={subject.short}>
    <div className="reader">
      <aside className="toc no-print">
        <button className="eyebrow btn ghost" style={{ padding: "0 8px 6px" }} onClick={() => setTocOpen((o) => !o)} aria-expanded={tocOpen}>
          {tocOpen ? "▾" : "▸"} Ch {c.number} sections · {done}/{c.sections.length} read
        </button>
        {tocOpen && c.sections.map((x) => (
          <a key={x.id} href={`#${x.id}`} className={current === x.id ? "on" : ""}>
            <span className={`dot ${isRead(x.id) ? "done" : ""}`} />{x.heading}{isMarked(x.id) ? " ★" : ""}
          </a>
        ))}
        <div style={{ padding: "8px 8px 12px" }}><Bar value={(done / c.sections.length) * 100} /></div>
      </aside>

      <article>
        <div className="eyebrow">{subject.short} · Chapter {c.number} · {c.approach} · <Src pages={c.pages} /></div>
        <h1 style={{ margin: "6px 0 14px" }}>{c.title}</h1>
        {c.pages[0] === 0 && <details className="card" style={{marginBottom:16}}><summary>About these notes and source suggestions</summary><p>Concise original syllabus notes. PDF page indices below are keyword-located reading suggestions, not verified printed-page citations. Read the supplied books for fuller treatment.</p>{c.sections.map(x => <p key={x.id} className="small"><strong>{x.heading}:</strong> {x.references?.length ? x.references.map(y => `${y.source}, PDF pages ${y.pdfPages.join(", ")}`).join("; ") : "Course-specific source/model requires lecturer confirmation."}</p>)}</details>}
        <div className="tabs no-print" role="tablist" aria-label="Reading mode">
          {MODES.map(([m, label]) => <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}>{label}</button>)}
        </div>

        {mode !== "revise" && (
          <div className="card" style={{ margin: "18px 0 28px" }}>
            <p className="prose" style={{ fontSize: "1rem" }}>{c.overview}</p>
            <details style={{ marginTop: 10 }}>
              <summary className="small" style={{ cursor: "pointer" }}>Learning objectives ({c.objectives.length})</summary>
              <ul style={{ margin: "8px 0 0 20px", listStyle: "disc" }}>{c.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </details>
          </div>
        )}

        {mode === "revise" ? <Revise c={c} /> : c.sections.map((x) => (
          <section key={x.id} id={x.id} className="sec" data-sec={x.id}>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <h2>{x.heading}</h2><Src pages={x.pages} />
            </div>
            {mode === "practice" ? null : (
              <div className="prose" style={{ marginTop: 10 }}>
                {(mode === "read" ? x.detailed : x.simple).split(/\n\n+/).map((p, i) => <p key={i}>{marked(p, hlFor(x.id))}</p>)}
              </div>
            )}
            {mode !== "practice" && <ul className="keypts" style={{ listStyle: "disc" }}>{x.keyPoints.map((k, i) => <li key={i}>{k}</li>)}</ul>}
            {(mode === "practice" || mode === "read") && (
              <div className="stack" style={{ marginTop: 16 }}>
                {c.checks.map((m, i) => ({ m, i })).filter(({ m }) => m.sectionId === x.id).map(({ m, i }) => (
                  <Mcq key={i} m={m} onAnswer={(ok) => update((st) => ({ ...st, checks: { ...st.checks, [`${c.uid}:${i}`]: ok } }))} />
                ))}
              </div>
            )}
            <div className="row no-print" style={{ marginTop: 14 }}>
              <button className={`btn ${isRead(x.id) ? "" : "primary"}`} onClick={() => toggleRead(x.id)}>{isRead(x.id) ? "✓ Read" : "Mark as read"}</button>
              <button className="btn" onClick={() => toggleMark(x.id)} aria-pressed={isMarked(x.id)}>{isMarked(x.id) ? "★ Bookmarked" : "☆ Bookmark"}</button>
            </div>
          </section>
        ))}

        {mode !== "revise" && c.examples.length > 0 && (
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="eyebrow">Everyday examples · supplementary, not from the textbook</div>
            {c.examples.map((e, i) => <div key={i} style={{ marginTop: 10 }}><strong>{e.title}.</strong> {e.text}</div>)}
          </div>
        )}

        <div className="row no-print" style={{ justifyContent: "space-between" }}>
          {prev ? <Link className="btn" href={`/read/${subject.id}/${prev}`}>← Ch {prev}</Link> : <span />}
          <Link className="btn primary" href={`/practice?s=${subject.id}&ch=${c.number}`}>Take the chapter {c.number} test</Link>
          {next ? <Link className="btn" href={`/read/${subject.id}/${next}`}>Ch {next} →</Link> : <span />}
        </div>
      </article>

      {sel && (
        <button className="btn primary no-print" style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 50, boxShadow: "0 4px 18px #0003" }}
          onMouseDown={(e) => e.preventDefault()} onClick={saveHighlight}>🖍 Highlight selection</button>
      )}
    </div>
    </SrcName.Provider>
  );
}

function Revise({ c }: { c: Chapter }) {
  return (
    <div className="stack" style={{ marginTop: 18 }}>
      <div className="card"><h2>Summary</h2><ul style={{ margin: "10px 0 0 20px", listStyle: "disc" }}>{c.summary.map((x, i) => <li key={i} style={{ marginTop: 4 }}>{x}</li>)}</ul></div>
      <div className="card"><h2>Key terms</h2>
        <div className="table-wrap"><table><tbody>{c.terms.map((t, i) => <tr key={i}><td style={{ fontWeight: 600, width: "28%" }}>{t.term}</td><td>{t.definition}</td><td><Src page={t.page} /></td></tr>)}</tbody></table></div>
      </div>
      {c.people.length > 0 && <div className="card"><h2>People</h2>
        <div className="table-wrap"><table><tbody>{c.people.map((p, i) => <tr key={i}><td style={{ fontWeight: 600, width: "28%" }}>{p.name}</td><td>{p.contribution}</td><td><Src page={p.page} /></td></tr>)}</tbody></table></div>
      </div>}
      {c.studies.length > 0 && <div className="card"><h2>Research findings</h2>
        <div className="table-wrap"><table><tbody>{c.studies.map((p, i) => <tr key={i}><td style={{ fontWeight: 600, width: "28%" }}>{p.title}</td><td>{p.finding}</td><td><Src page={p.page} /></td></tr>)}</tbody></table></div>
      </div>}
      <div className="card"><h2>Section key points</h2>
        {c.sections.map((x) => <div key={x.id} style={{ marginTop: 12 }}><strong>{x.heading}</strong> <Src pages={x.pages} /><ul style={{ margin: "4px 0 0 20px", listStyle: "disc" }}>{x.keyPoints.map((k, i) => <li key={i}>{k}</li>)}</ul></div>)}
      </div>
    </div>
  );
}
