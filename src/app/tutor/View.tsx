"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string; sources?: { id: number; title: string; pages: string; href: string }[] };
const STARTERS = [
  "Compare Broadbent’s filter with attenuation theory.",
  "Help me choose between convergent and explanatory sequential designs.",
  "Compare Freud's and Jung's views of the unconscious.",
  "Explain the defense mechanisms with one example each.",
  "Make me 5 MCQs on Jung's psychological types.",
  "What are the main methods of personality assessment?",
  "What are the three stages of Egan's helping model?",
];

export default function Tutor({ subjects }: { subjects: { id: string; short: string; paper: string; count: number }[] }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("teach");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: text.trim() }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/tutor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: "chat", subject, style, messages: next.map(({role,content})=>({role,content})) }) });
      const j = await r.json();
      setMsgs([...next, { role: "assistant", content: j.text ?? j.error, sources: j.sources }]);
    } catch { setMsgs([...next, { role: "assistant", content: "Couldn't reach the tutor. Check your connection." }]); }
    setBusy(false);
  };

  return (
    <div className="stack" style={{ maxWidth: 780 }}>
      <div>
        <div className="eyebrow">AI tutor</div>
        <h1>Think it through.</h1>
        <p className="muted small">Answers search course notes and selected extracted textbook passages. Source cards distinguish printed citations, PDF indices and uncited notes. This is a study tutor, not counselling.</p>
      </div>
      <label className="row small">Search in
        <select style={{ width: "auto" }} value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">All textbooks</option>
          {subjects.filter((x) => x.count).map((x) => <option key={x.id} value={x.id}>{x.paper} · {x.short}</option>)}
        </select>
      </label>
      <div className="row"><label>Learning mode <select value={style} onChange={e=>setStyle(e.target.value)}><option value="teach">Teach me</option><option value="socratic">Guide with hints</option><option value="quiz">Quiz me</option><option value="exam">Exam answer</option></select></label><button className="btn" disabled={busy} onClick={()=>setMsgs([])}>New conversation</button></div>
      {!msgs.length && <div className="grid">{STARTERS.map((s) => <button key={s} className="card" style={{ textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }} onClick={() => send(s)}>{s}</button>)}</div>}
      {msgs.map((m, i) => (
        <div key={i} className={m.role === "user" ? "sunk" : "card rise"} style={{ whiteSpace: "pre-wrap", marginLeft: m.role === "user" ? "auto" : 0, maxWidth: m.role === "user" ? "85%" : "100%" }}>
          {m.role === "assistant" && <div className="eyebrow" style={{ marginBottom: 6 }}>Tutor</div>}
          {m.content}
          {!!m.sources?.length && <details style={{marginTop:12,whiteSpace:"normal"}}><summary>Retrieved sources ({m.sources.length})</summary>{m.sources.map(x=><p className="small" key={x.id}><a href={x.href}>[{x.id}] {x.title}</a> · {x.pages}</p>)}</details>}
        </div>
      ))}
      {busy && <div className="muted small">Thinking…</div>}
      <div ref={end} />
      <form className="row" style={{ position: "sticky", bottom: 12, background: "var(--bg)", paddingTop: 8 }} onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question about any written chapter…" style={{ flex: 1, minWidth: 0 }} aria-label="Your question" />
        <button className="btn primary" disabled={busy || !input.trim()}>Send</button>
      </form>
    </div>
  );
}
