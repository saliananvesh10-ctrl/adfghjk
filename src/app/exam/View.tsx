"use client";
import { useState } from "react";
import type { PracticeQ, SubjectMeta, WithPractice } from "@/content/types";
import { Paras, Src, SrcName, SubjectTabs } from "@/components/ui";

type Tab = { id: string; short: string; paper: string; count: number };

export default function Exam({ subject, tabs, chapters }: { subject: SubjectMeta; tabs: Tab[]; chapters: WithPractice[] }) {
  const [marks, setMarks] = useState<0 | 2 | 5 | 10>(0);
  const [ch, setCh] = useState<number | "all">("all");
  const qs = chapters
    .filter((c) => ch === "all" || c.number === ch)
    .flatMap((c) => c.practice.map((p) => ({ ...p, ch: c.number })))
    .filter((p) => !marks || p.marks === marks);

  return (
    <SrcName.Provider value={subject.short}>
      <div className="stack" style={{ maxWidth: 820 }}>
        <div>
          <div className="eyebrow">Exam preparation · {subject.paper}</div>
          <h1>Long and short answers</h1>
          <p className="muted small">Write your answer first, then compare it with the model answer. The tutor can mark your answer against it (needs the AI key).</p>
        </div>
        <SubjectTabs path="/exam" subjects={tabs} current={subject.id} />
        {!chapters.length ? <div className="card muted">No chapters of {subject.name} are written yet.</div> : (
          <>
            <div className="row">
              <div className="tabs" role="tablist">
                {([0, 2, 5, 10] as const).map((m) => <button key={m} role="tab" aria-selected={marks === m} onClick={() => setMarks(m)}>{m ? `${m} marks` : "All"}</button>)}
              </div>
              <select style={{ width: "auto" }} value={ch} onChange={(e) => setCh(e.target.value === "all" ? "all" : Number(e.target.value))}>
                <option value="all">All chapters</option>
                {chapters.map((c) => <option key={c.uid} value={c.number}>Ch {c.number}: {c.theorist ?? c.title}</option>)}
              </select>
              <span className="muted small">{qs.length} questions</span>
            </div>
            {qs.map((q, i) => <Question key={`${subject.id}-${q.ch}-${q.q}`} q={q} n={i + 1} subject={subject} />)}
          </>
        )}
      </div>
    </SrcName.Provider>
  );
}

function Question({ q, n, subject }: { q: PracticeQ & { ch: number }; n: number; subject: SubjectMeta }) {
  const [draft, setDraft] = useState("");
  const [show, setShow] = useState(false);
  const [review, setReview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const ask = async () => {
    setBusy(true); setReview(null);
    try {
      const r = await fetch("/api/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: "review", review: { question: q.q, marks: q.marks, model: q.answer, student: draft, subject: subject.id, chapter: q.ch } }) });
      const j = await r.json(); setReview(j.text ?? j.error);
    } catch { setReview("Couldn't reach the tutor."); }
    setBusy(false);
  };
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="eyebrow">Q{n} · Ch {q.ch}</span>
        <span className="row"><span className="chip acc">{q.marks} marks</span><Src pages={q.pages} /></span>
      </div>
      <h3 style={{ margin: "8px 0 12px" }}>{q.q}</h3>
      <textarea placeholder="Write your answer…" value={draft} onChange={(e) => setDraft(e.target.value)} style={{ minHeight: q.marks === 10 ? 220 : q.marks === 5 ? 140 : 70 }} />
      <div className="row" style={{ marginTop: 10 }}>
        <span className="muted small">{draft.trim() ? draft.trim().split(/\s+/).length : 0} words</span>
        <button className="btn" onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"} model answer</button>
        <button className="btn primary" disabled={draft.trim().length < 20 || busy} onClick={ask}>{busy ? "Marking…" : "Mark my answer"}</button>
      </div>
      {show && <div className="sunk" style={{ marginTop: 12 }}><div className="eyebrow" style={{ marginBottom: 6 }}>Model answer</div><Paras text={q.answer} /></div>}
      {review && <div className="explain" style={{ whiteSpace: "pre-wrap" }}>{review}</div>}
    </div>
  );
}
