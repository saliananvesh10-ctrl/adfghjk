"use client";
import { createContext, useContext, useState } from "react";
import type { MCQ, Pages } from "@/content/types";

export function Paras({ text, className = "prose" }: { text: string; className?: string }) {
  return <div className={className}>{text.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div>;
}

// Which book page refs belong to ("Schultz p. 45"). Pages set it via <SrcName.Provider>.
export const SrcName = createContext("Schultz");
export function Src({ page, pages, book }: { page?: number; pages?: Pages | readonly number[]; book?: string }) {
  const name = useContext(SrcName);
  if ((pages && pages[0] === 0) || page === 0) return <span className="src">Syllabus study note · no verified book pagination</span>;
  const t = pages ? (pages[0] === pages[1] ? `p. ${pages[0]}` : `pp. ${pages[0]}–${pages[1]}`) : `p. ${page}`;
  return <span className="src">{book ?? name} {t}</span>;
}

// Subject switcher used by practice, flashcards, exam and revision (links keep the current page).
export function SubjectTabs({ path, subjects, current }: { path: string; subjects: { id: string; short: string; paper: string; count: number }[]; current: string }) {
  return (
    <div className="tabs" role="tablist" aria-label="Textbook" style={{ flexWrap: "wrap" }}>
      {subjects.map((x) => (
        <a key={x.id} role="tab" aria-selected={x.id === current} href={`${path}?s=${x.id}`} className="tablink">
          {x.paper} · {x.short}{x.count ? "" : " (pending)"}
        </a>
      ))}
    </div>
  );
}

export function Bar({ value }: { value: number }) {
  return <div className="bar" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

// One multiple-choice question. Locks after the first pick and reports correctness.
export function Mcq({ m, n, onAnswer }: { m: MCQ; n?: number; onAnswer?: (correct: boolean) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  const choose = (i: number) => { if (pick !== null) return; setPick(i); onAnswer?.(i === m.answer); };
  return (
    <div className="card rise">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong style={{ fontFamily: "var(--serif)" }}>{n ? `${n}. ` : ""}{m.q}</strong>
      </div>
      {m.options.map((o, i) => (
        <button key={i} className={`opt ${pick !== null && i === m.answer ? "right" : ""} ${pick === i && i !== m.answer ? "wrong" : ""}`} disabled={pick !== null} onClick={() => choose(i)}>
          {String.fromCharCode(65 + i)}. {o}
        </button>
      ))}
      {pick !== null && (
        <div className="explain">
          <strong>{pick === m.answer ? "Correct." : `Answer: ${String.fromCharCode(65 + m.answer)}.`}</strong> {m.explain} <Src page={m.page} />
        </div>
      )}
    </div>
  );
}
