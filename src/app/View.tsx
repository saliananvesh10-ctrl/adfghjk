"use client";
import Link from "next/link";
import StudyTools from "@/components/StudyTools";
import type { Lite, OutlineItem, SubjectMeta } from "@/content/types";
import { parseUid } from "@/content/types";
import { useProgress, sectionKey } from "@/lib/progress";
import { Bar } from "@/components/ui";

type Group = { meta: SubjectMeta; outline: readonly OutlineItem[]; chapters: Lite[] };

export default function Dashboard({ groups }: { groups: Group[] }) {
  const s = useProgress();
  const now = Date.now();
  const all = groups.flatMap((g) => g.chapters);
  const totalSections = all.reduce((a, c) => a + c.sections.length, 0);
  const readCount = all.reduce((a, c) => a + c.sections.filter((x) => s.read[sectionKey(c.uid, x.id)]).length, 0);
  const totalCards = all.reduce((a, c) => a + c.flashcards.length, 0);
  const due = all.reduce((a, c) => a + c.flashcards.filter((_, i) => (s.cards[`${c.uid}:${i}`]?.due ?? 0) <= now).length, 0);
  const tests = Object.values(s.quizBest);
  const avg = tests.length ? Math.round(tests.reduce((a, b) => a + b, 0) / tests.length) : null;
  const last = s.last;
  const lastCh = last ? all.find((c) => c.uid === last.ch) : null;
  const lastSub = last ? groups.find((g) => g.meta.id === parseUid(last.ch).s)?.meta : null;
  const written = all.length, planned = groups.reduce((a, g) => a + g.outline.length, 0);

  return (
    <div className="stack">
      <div className="mind-hero">
        <div className="eyebrow">Your psychology study space</div>
        <h1>Understand the mind.<br/>Build your own.</h1>
        <p className="muted">Four papers. Reading, retrieval practice and guided exploration. {written} of {planned} chapters and unit guides available.</p>
      </div>

      <StudyTools />
      <div className="grid">
        <div className="card">
          <div className="eyebrow">Continue</div>
          {lastCh && lastSub ? (
            <>
              <h3 style={{ margin: "6px 0" }}>{lastSub.short} Ch {lastCh.number}: {lastCh.title}</h3>
              <p className="muted small">{lastCh.sections.find((x) => x.id === last!.sectionId)?.heading ?? "Start of chapter"} · {last!.mode} mode</p>
              <Link className="btn primary" href={`/read/${lastSub.id}/${lastCh.number}${last!.sectionId ? `#${last!.sectionId}` : ""}`}>Pick up where you left off</Link>
            </>
          ) : (
            <>
              <h3 style={{ margin: "6px 0" }}>Start reading</h3>
              <p className="muted small">Pick any chapter below, or start with Theories of Personality, Chapter 1.</p>
              <Link className="btn primary" href="/read/personality/1">Open the reader</Link>
            </>
          )}
        </div>
        <Stat label="Sections read" value={`${readCount} / ${totalSections}`} pct={(readCount / Math.max(1, totalSections)) * 100} />
        <Stat label="Flashcards due" value={`${due}`} sub={`of ${totalCards}`} href="/flashcards" />
        <Stat label="Average chapter test" value={avg === null ? "—" : `${avg}%`} sub={`${tests.length} test${tests.length === 1 ? "" : "s"} taken`} href="/practice" />
      </div>

      {groups.map((g) => (
        <section key={g.meta.id} style={{ marginTop: 26 }}>
          <div className="eyebrow">{g.meta.paper}</div>
          <h2 style={{ marginBottom: 10 }}>{g.meta.name} <span className="muted small" style={{ fontFamily: "var(--sans)", fontWeight: 400 }}>· {g.chapters.length}/{g.outline.length} chapters ready</span></h2>
          <div className="grid">
            {g.outline.map((o) => {
              const c = g.chapters.find((x) => x.number === o.number);
              const done = c ? c.sections.filter((x) => s.read[sectionKey(c.uid, x.id)]).length : 0;
              const best = c ? s.quizBest[c.uid] : undefined;
              return (
                <Link key={o.number} href={c ? `/read/${g.meta.id}/${o.number}` : "/sources"} className="card" style={{ textDecoration: "none", opacity: c ? 1 : 0.6 }}>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <span className="eyebrow">Ch {o.number} · {o.approach}</span>
                    {c ? (best != null ? <span className="chip ok">Test {best}%</span> : null) : <span className="chip">Pending</span>}
                  </div>
                  <h3 style={{ margin: "6px 0 10px" }}>{o.title}</h3>
                  {c && <><Bar value={(done / c.sections.length) * 100} /><div className="muted small" style={{ marginTop: 6 }}>{done}/{c.sections.length} sections</div></>}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function Stat({ label, value, sub, pct, href }: { label: string; value: string; sub?: string; pct?: number; href?: string }) {
  const body = (
    <>
      <div className="eyebrow">{label}</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 600, margin: "4px 0" }}>{value}</div>
      {sub && <div className="muted small">{sub}</div>}
      {pct != null && <Bar value={pct} />}
    </>
  );
  return href ? <Link href={href} className="card" style={{ textDecoration: "none" }}>{body}</Link> : <div className="card">{body}</div>;
}
