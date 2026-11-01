"use client";
import Link from "next/link";
import { useState } from "react";
import type { SubjectMeta, WithRevision } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { Src, SrcName, SubjectTabs } from "@/components/ui";

type Tab = { id: string; short: string; paper: string; count: number };

export default function Revision({ subject, tabs, chapters }: { subject: SubjectMeta; tabs: Tab[]; chapters: WithRevision[] }) {
  const s = useProgress();
  const [ch, setCh] = useState(chapters[0]?.number);
  const c = chapters.find((x) => x.number === ch);
  const marks = c ? s.bookmarks.filter((b) => b.ch === c.uid) : [];
  const hls = c ? s.highlights.filter((h) => h.ch === c.uid) : [];

  return (
    <SrcName.Provider value={subject.short}>
      <div className="stack" style={{ maxWidth: 860 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div><div className="eyebrow">Revision · {subject.paper}</div><h1>One-page recap</h1></div>
          <button className="btn no-print" onClick={() => print()}>Print / save PDF</button>
        </div>
        <div className="no-print"><SubjectTabs path="/revision" subjects={tabs} current={subject.id} /></div>
        {!c ? <div className="card muted">No chapters of {subject.name} are written yet.</div> : (
          <>
            <div className="tabs no-print" role="tablist" style={{ flexWrap: "wrap" }}>
              {chapters.map((x) => <button key={x.uid} role="tab" aria-selected={ch === x.number} onClick={() => setCh(x.number)}>Ch {x.number}</button>)}
            </div>
            <h2>{subject.short} Ch {c.number}: {c.title} <Src pages={c.pages} /></h2>
            <div className="card"><div className="eyebrow">Summary</div><ul style={{ margin: "8px 0 0 20px", listStyle: "disc" }}>{c.summary.map((x, i) => <li key={i} style={{ marginTop: 4 }}>{x}</li>)}</ul></div>
            <div className="card"><div className="eyebrow">Must-know terms</div>
              <div className="table-wrap"><table><tbody>{c.terms.map((t, i) => <tr key={i}><td style={{ fontWeight: 600, width: "30%" }}>{t.term}</td><td>{t.definition}</td><td><Src page={t.page} /></td></tr>)}</tbody></table></div>
            </div>
            {(marks.length > 0 || hls.length > 0) && (
              <div className="card"><div className="eyebrow">Your bookmarks and highlights</div>
                {marks.map((b) => { const sec = c.sections.find((x) => x.id === b.sectionId); return sec && <div key={b.sectionId} style={{ marginTop: 8 }}>★ <Link href={`/read/${subject.id}/${c.number}#${b.sectionId}`}>{sec.heading}</Link></div>; })}
                {hls.map((h, i) => <p key={i} style={{ marginTop: 8 }}><mark>{h.text}</mark></p>)}
              </div>
            )}
          </>
        )}
      </div>
    </SrcName.Provider>
  );
}
