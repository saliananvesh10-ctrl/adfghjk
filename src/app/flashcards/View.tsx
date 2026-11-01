"use client";
import { useMemo, useState } from "react";
import type { SubjectMeta, WithCards } from "@/content/types";
import { update, useProgress, BOX_DAYS } from "@/lib/progress";
import { Src, SrcName, SubjectTabs } from "@/components/ui";

const DAY = 86_400_000;
type Tab = { id: string; short: string; paper: string; count: number };

export default function Flashcards({ subject, tabs, chapters }: { subject: SubjectMeta; tabs: Tab[]; chapters: WithCards[] }) {
  const s = useProgress();
  const [ch, setCh] = useState<number | "all">("all");
  const [onlyDue, setOnlyDue] = useState(true);
  const [flip, setFlip] = useState(false);
  const [i, setI] = useState(0);

  const deck = useMemo(() => {
    const now = Date.now();
    return chapters
      .filter((c) => ch === "all" || c.number === ch)
      .flatMap((c) => c.flashcards.map((card, k) => ({ ...card, key: `${c.uid}:${k}`, ch: c.number })))
      .filter((card) => !onlyDue || (s.cards[card.key]?.due ?? 0) <= now);
  // Deck is fixed while you study; rebuilt only when filters change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch, onlyDue, chapters]);

  const card = deck[i];
  const grade = (knew: boolean) => {
    if (!card) return;
    update((st) => {
      const box = knew ? Math.min((st.cards[card.key]?.box ?? 0) + 1, BOX_DAYS.length - 1) : 0;
      return { ...st, cards: { ...st.cards, [card.key]: { box, due: Date.now() + BOX_DAYS[box] * DAY } } };
    });
    setFlip(false); setI((x) => x + 1);
  };
  const mastered = chapters.reduce((a, c) => a + c.flashcards.filter((_, k) => (s.cards[`${c.uid}:${k}`]?.box ?? 0) >= 3).length, 0);

  return (
    <SrcName.Provider value={subject.short}>
      <div className="stack" style={{ maxWidth: 680 }}>
        <div>
          <div className="eyebrow">Flashcards · {subject.paper}</div>
          <h1>Spaced repetition</h1>
          <p className="muted small">Cards you know move up a box and come back after 1, 3, 7 then 16 days. Cards you miss go back to box 0. {mastered} cards mastered in {subject.short}.</p>
        </div>
        <SubjectTabs path="/flashcards" subjects={tabs} current={subject.id} />
        {!chapters.length ? <div className="card muted">No chapters of {subject.name} are written yet.</div> : (
          <>
            <div className="row">
              <select style={{ width: "auto" }} value={ch} onChange={(e) => { setCh(e.target.value === "all" ? "all" : Number(e.target.value)); setI(0); setFlip(false); }}>
                <option value="all">All chapters</option>
                {chapters.map((c) => <option key={c.uid} value={c.number}>Ch {c.number}: {c.theorist ?? c.title}</option>)}
              </select>
              <label className="row small" style={{ gap: 6 }}><input type="checkbox" style={{ width: "auto" }} checked={onlyDue} onChange={(e) => { setOnlyDue(e.target.checked); setI(0); }} /> Due only</label>
              <span className="muted small">{Math.min(i, deck.length)}/{deck.length}</span>
            </div>
            {card ? (
              <>
                <div className="flip" data-on={flip} onClick={() => setFlip((f) => !f)} role="button" tabIndex={0} aria-label="Flip card" onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), setFlip((f) => !f))}>
                  <div className="inner">
                    <div className="card face front">{card.front}</div>
                    <div className="card face back"><div>{card.back}<div style={{ marginTop: 12 }}><span className="chip">Ch {card.ch}</span> <Src page={card.page} /></div></div></div>
                  </div>
                </div>
                <div className="row" style={{ justifyContent: "center" }}>
                  {flip ? (<><button className="btn" onClick={() => grade(false)}>✗ Didn&apos;t know</button><button className="btn primary" onClick={() => grade(true)}>✓ Knew it</button></>)
                    : <button className="btn primary" onClick={() => setFlip(true)}>Show answer</button>}
                </div>
              </>
            ) : (
              <div className="card" style={{ textAlign: "center" }}>
                <h3>{deck.length ? "Session done" : "Nothing due right now"}</h3>
                <p className="muted small">{onlyDue ? "Untick “Due only” to review every card." : "Change the chapter to keep going."}</p>
                <button className="btn" onClick={() => { setI(0); setFlip(false); }}>Restart</button>
              </div>
            )}
          </>
        )}
      </div>
    </SrcName.Provider>
  );
}
