"use client";
import { useEffect, useMemo, useState } from "react";
import type { MCQ, SubjectMeta, WithQuiz } from "@/content/types";
import { update, useProgress } from "@/lib/progress";
import { Mcq, SrcName, SubjectTabs } from "@/components/ui";

type Tab = { id: string; short: string; paper: string; count: number };
function shuffle<T>(a: T[]) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

export default function Practice({ subject, tabs, chapters, start }: { subject: SubjectMeta; tabs: Tab[]; chapters: WithQuiz[]; start: number | null }) {
  const s = useProgress();
  const [ch, setCh] = useState<number | "mixed">(start && chapters.some((c) => c.number === start) ? start : chapters[0]?.number ?? "mixed");
  const [run, setRun] = useState(0);
  const [score, setScore] = useState({ right: 0, done: 0 });
  // Shuffle only after mount: a random order during server render would not match the browser's.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mix = <T,>(a: T[]) => (mounted ? shuffle(a) : a);
  const cur = chapters.find((c) => c.number === ch);

  // Chapter test = the chapter's assessment. Mixed = 15 random items across this book.
  const qs: MCQ[] = useMemo(() => {
    if (ch === "mixed") return mix(chapters.flatMap((c) => [...c.assessment, ...c.checks])).slice(0, 15);
    return mix(cur?.assessment ?? []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch, run, chapters, mounted]);

  const answer = (ok: boolean) => setScore((p) => {
    const n = { right: p.right + (ok ? 1 : 0), done: p.done + 1 };
    if (n.done === qs.length && cur) {
      const pct = Math.round((n.right / qs.length) * 100);
      update((st) => ({ ...st, quizBest: { ...st.quizBest, [cur.uid]: Math.max(pct, st.quizBest[cur.uid] ?? 0) } }));
    }
    return n;
  });
  const restart = (next: number | "mixed") => { setCh(next); setRun((r) => r + 1); setScore({ right: 0, done: 0 }); };

  return (
    <SrcName.Provider value={subject.short}>
      <div className="stack" style={{ maxWidth: 760 }}>
        <div><div className="eyebrow">Practice &amp; quizzes · {subject.paper}</div><h1>Test yourself</h1></div>
        <SubjectTabs path="/practice" subjects={tabs} current={subject.id} />
        {!chapters.length ? <div className="card muted">No chapters of {subject.name} are written yet.</div> : (
          <>
            <div className="tabs" role="tablist" style={{ flexWrap: "wrap" }}>
              {chapters.map((c) => <button key={c.uid} role="tab" aria-selected={ch === c.number} onClick={() => restart(c.number)}>Ch {c.number}{s.quizBest[c.uid] != null ? ` · ${s.quizBest[c.uid]}%` : ""}</button>)}
              <button role="tab" aria-selected={ch === "mixed"} onClick={() => restart("mixed")}>Mixed 15</button>
            </div>
            {cur && <p className="muted small">Chapter {cur.number}: {cur.title}</p>}
            <div className="sunk row" style={{ justifyContent: "space-between", position: "sticky", top: 8, zIndex: 5 }}>
              <span>{score.done}/{qs.length} answered · <strong>{score.right} correct</strong></span>
              <button className="btn" onClick={() => restart(ch)}>Shuffle &amp; restart</button>
            </div>
            {qs.map((m, i) => <Mcq key={`${run}-${ch}-${i}`} m={m} n={i + 1} onAnswer={answer} />)}
            {score.done === qs.length && qs.length > 0 && (
              <div className="card" style={{ textAlign: "center" }}>
                <h2>{Math.round((score.right / qs.length) * 100)}%</h2>
                <p className="muted">{ch === "mixed" ? "Mixed practice isn't recorded." : "Best score saved to your progress."}</p>
                <button className="btn primary" onClick={() => restart(ch)}>Try again</button>
              </div>
            )}
          </>
        )}
      </div>
    </SrcName.Provider>
  );
}
