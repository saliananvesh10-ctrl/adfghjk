"use client";
import { useEffect, useMemo, useState } from "react";
import { freudMind, stages, defenses, jungTypes, jungFunctions, archetypes, methods, methodNotes, birthOrder, birthOrderNote, horneyTrends, horneyNotes, eriksonStages } from "@/content/personality/lab";
import { Src, SrcName } from "@/components/ui";
import Link from "next/link";
import { model, soler, solerNotes, rami, substitutes } from "@/content/egan/lab";

const TOOLS = [
  ["methods", "Research method sorter", "Ch 1"],
  ["mind", "Freud's iceberg", "Ch 2"],
  ["stages", "Psychosexual stages", "Ch 2"],
  ["defenses", "Spot the defense", "Ch 2"],
  ["jung", "Jung's types & archetypes", "Ch 3"],
  ["birth", "Adler's birth order", "Ch 4"],
  ["horney", "Horney's neurotic trends", "Ch 5"],
  ["erikson", "Erikson's eight stages", "Ch 6"],
  ["egan-model", "The Skilled Helper model", "Egan Ch 8"],
  ["soler", "SOLER", "Egan Ch 3"],
  ["substitutes", "Poor substitutes for empathy", "Egan Ch 4"],
] as const;
type Tool = (typeof TOOLS)[number][0];

export default function Lab() {
  const [tool, setTool] = useState<Tool>("mind");
  return (
    <div className="stack" style={{ maxWidth: 980 }}>
      <div>
        <div className="eyebrow">Psychology lab</div>
        <h1>Explore the models</h1>
        <p className="muted small">Interactive versions of the textbook&apos;s models. Every label links to its page in Schultz &amp; Schultz.</p>
      </div>
      {[["Theories of Personality · Schultz", (t: string) => !t.startsWith("Egan")], ["Introduction to Counselling · Egan", (t: string) => t.startsWith("Egan")]].map(([label, f]) => (
        <div key={label as string}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>{label as string}</div>
          <div className="tabs" role="tablist" style={{ flexWrap: "wrap" }}>
            {TOOLS.filter(([, , ch]) => (f as (t: string) => boolean)(ch)).map(([id, name, ch]) => <button key={id} role="tab" aria-selected={tool === id} onClick={() => setTool(id)}>{name} <span className="muted">· {ch}</span></button>)}
          </div>
        </div>
      ))}
      {tool === "mind" && <Mind />}
      {tool === "stages" && <Stages />}
      {tool === "defenses" && <Defenses />}
      {tool === "jung" && <Jung />}
      {tool === "methods" && <Methods />}
      {tool === "birth" && <Birth />}
      {tool === "horney" && <Horney />}
      {tool === "erikson" && <Erikson />}
      <SrcName.Provider value="Egan">
        {tool === "egan-model" && <EganModel />}
        {tool === "soler" && <Soler />}
        {tool === "substitutes" && <Substitutes />}
      </SrcName.Provider>
    </div>
  );
}

function Mind() {
  const [pick, setPick] = useState<string>("unconscious");
  const all = [...freudMind.levels, ...freudMind.structures];
  const cur = all.find((x) => x.id === pick)!;
  const st = freudMind.structures.find((x) => x.id === pick);
  const zone = (id: string) => ({ onClick: () => setPick(id), style: { cursor: "pointer" }, role: "button", tabIndex: 0, "aria-label": all.find((x) => x.id === id)!.name, onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && setPick(id) });
  const on = (id: string) => (pick === id ? 1 : 0.55);
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
      <div className="card">
        <svg viewBox="0 0 400 420" width="100%" role="img" aria-label="Freud's iceberg model of the mind">
          <defs><clipPath id="berg"><path d="M200 18 L262 92 L300 150 L336 260 L360 410 L40 410 L66 270 L104 150 L142 90 Z" /></clipPath></defs>
          <rect x="0" y="0" width="400" height="104" fill="var(--sunk)" />
          <rect x="0" y="104" width="400" height="316" fill="var(--accent-soft)" />
          <g clipPath="url(#berg)">
            <rect {...zone("conscious")} x="0" y="0" width="400" height="104" fill="var(--surface)" opacity={on("conscious")} />
            <rect {...zone("preconscious")} x="0" y="104" width="400" height="66" fill="var(--line)" opacity={on("preconscious")} />
            <rect {...zone("unconscious")} x="0" y="170" width="400" height="250" fill="var(--muted)" opacity={on("unconscious") * 0.7} />
          </g>
          <path d="M0 104 Q 50 96 100 104 T 200 104 T 300 104 T 400 104" stroke="var(--accent)" strokeWidth="2" fill="none">
            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0 104 Q 50 96 100 104 T 200 104 T 300 104 T 400 104;M0 104 Q 50 112 100 104 T 200 104 T 300 104 T 400 104;M0 104 Q 50 96 100 104 T 200 104 T 300 104 T 400 104" />
          </path>
          <text x="388" y="98" textAnchor="end" fontSize="11" fill="var(--muted)">surface of awareness</text>
          {/* structures as pills that span levels, matching Figure 2.1 */}
          <g {...zone("ego")}><rect x="150" y="56" width="100" height="160" rx="16" fill="var(--accent)" opacity={on("ego") * 0.9} /><text x="200" y="140" textAnchor="middle" fill="var(--accent-ink)" fontWeight="700">EGO</text></g>
          <g {...zone("superego")}><rect x="258" y="120" width="78" height="200" rx="16" fill="var(--good)" opacity={on("superego") * 0.9} /><text x="297" y="225" textAnchor="middle" fill="var(--accent-ink)" fontWeight="700" fontSize="12">SUPEREGO</text></g>
          <g {...zone("id")}><rect x="70" y="250" width="180" height="140" rx="20" fill="var(--bad)" opacity={on("id") * 0.85} /><text x="160" y="326" textAnchor="middle" fill="#fff" fontWeight="700">ID</text></g>
          <text x="10" y="40" fontSize="12" fill="var(--ink)" {...zone("conscious")}>Conscious</text>
          <text x="10" y="142" fontSize="12" fill="var(--ink)" {...zone("preconscious")}>Preconscious</text>
          <text x="10" y="205" fontSize="12" fill="var(--ink)" {...zone("unconscious")}>Unconscious</text>
        </svg>
        <p className="small muted">Tap a level or a structure. Based on Figure 2.1 <Src page={45} />.</p>
      </div>
      <div className="stack">
        <div className="card rise" key={cur.id}>
          <div className="row" style={{ justifyContent: "space-between" }}><h2>{cur.name}</h2><Src page={cur.page} /></div>
          {st && <div className="row" style={{ margin: "8px 0" }}><span className="chip acc">{st.principle}</span><span className="chip">{st.thought}</span></div>}
          <p style={{ marginTop: 8 }}>{cur.text}</p>
        </div>
        <div className="card">
          <div className="eyebrow">When the ego is overwhelmed: three anxieties</div>
          {freudMind.anxiety.map((a) => <p key={a.name} style={{ marginTop: 8 }}><strong>{a.name}.</strong> {a.text} <Src page={a.page} /></p>)}
        </div>
      </div>
    </div>
  );
}

function Stages() {
  const [i, setI] = useState(0);
  const s = stages[i];
  return (
    <div className="stack">
      <div className="card">
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${stages.length}, 1fr)`, gap: 6 }}>
          {stages.map((x, k) => (
            <button key={x.name} onClick={() => setI(k)} className="btn" style={{ flexDirection: "column", alignItems: "flex-start", background: k === i ? "var(--accent)" : undefined, color: k === i ? "var(--accent-ink)" : undefined, borderColor: k === i ? "var(--accent)" : undefined, minWidth: 0 }}>
              <strong style={{ fontSize: ".85rem" }}>{x.name}</strong><span style={{ fontSize: ".72rem", opacity: 0.8 }}>{x.ages}</span>
            </button>
          ))}
        </div>
        <div className="bar" style={{ marginTop: 12 }}><i style={{ width: `${((i + 1) / stages.length) * 100}%` }} /></div>
      </div>
      <div className="card rise" key={s.name}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2>{s.name} stage</h2><span className="row"><span className="chip acc">Ages {s.ages}</span><span className="chip">Zone: {s.zone}</span></span></div>
        <p style={{ marginTop: 10 }}>{s.focus} <Src page={s.page} /></p>
        <div className="explain"><strong>If fixated:</strong> {s.fixation} <Src page={s.fixPage} /></div>
      </div>
      <p className="small muted">Ages from Table 2.2 <Src page={52} />. Fixation happens when a stage&apos;s conflict is unresolved or needs are overindulged, leaving libido invested there <Src page={52} />.</p>
    </div>
  );
}

function shuffle<T>(a: T[]) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

function Defenses() {
  const [seed, setSeed] = useState(0);
  // Shuffle after mount so the server-rendered order matches the first browser render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const order = useMemo(() => (mounted ? shuffle(defenses) : defenses), [seed, mounted]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const d = order[i];
  const next = () => { setPick(null); if (i + 1 < order.length) setI(i + 1); else { setSeed((s) => s + 1); setI(0); setScore(0); } };
  return (
    <div className="stack" style={{ maxWidth: 720 }}>
      <div className="sunk row" style={{ justifyContent: "space-between" }}><span>Scenario {i + 1} of {order.length}</span><strong>{score} correct</strong></div>
      <div className="card rise" key={d.name + seed}>
        <div className="eyebrow">Which defense mechanism is this?</div>
        <p className="prose" style={{ margin: "10px 0 6px" }}>{d.scenario}</p>
        <span className="small muted">Example from the textbook <Src page={d.page} /></span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 6, marginTop: 12 }}>
          {defenses.map((x) => (
            <button key={x.name} className={`opt ${pick && x.name === d.name ? "right" : ""} ${pick === x.name && x.name !== d.name ? "wrong" : ""}`} style={{ marginTop: 0 }} disabled={!!pick}
              onClick={() => { setPick(x.name); if (x.name === d.name) setScore((s) => s + 1); }}>{x.name}</button>
          ))}
        </div>
        {pick && <div className="explain"><strong>{d.name}:</strong> {d.def} <Src page={d.page} /><div style={{ marginTop: 8 }}><button className="btn primary" onClick={next}>{i + 1 < order.length ? "Next scenario" : "Play again"}</button></div></div>}
      </div>
      <p className="small muted">All defenses share two features: they deny or distort reality, and they operate unconsciously <Src page={49} />.</p>
    </div>
  );
}

function Jung() {
  const [att, setAtt] = useState<"extraverted" | "introverted">("extraverted");
  const [fn, setFn] = useState("thinking");
  const t = jungTypes[`${att}-${fn}`];
  const f = jungFunctions.find((x) => x.id === fn)!;
  return (
    <div className="stack">
      <div className="card">
        <div className="eyebrow">Build a psychological type: 2 attitudes × 4 functions = 8 types <Src page={88} /></div>
        <div className="row" style={{ marginTop: 10 }}>
          <div className="tabs">{(["extraverted", "introverted"] as const).map((a) => <button key={a} aria-selected={att === a} onClick={() => setAtt(a)}>{a[0].toUpperCase() + a.slice(1)}</button>)}</div>
          <div className="tabs">{jungFunctions.map((x) => <button key={x.id} aria-selected={fn === x.id} onClick={() => setFn(x.id)}>{x.name}</button>)}</div>
        </div>
        <div className="rise" key={att + fn} style={{ marginTop: 14 }}>
          <h2 style={{ textTransform: "capitalize" }}>{att} {f.name.toLowerCase()} type</h2>
          <p style={{ marginTop: 6 }}>{t.text} <Src page={t.page} /></p>
          <div className="explain"><strong>{f.name}</strong> is a {f.kind.toLowerCase()} function: {f.text} <Src page={f.page} /> {att === "extraverted" ? "Extraverts direct psychic energy outward, toward people and the external world." : "Introverts direct psychic energy inward, toward their own thoughts and feelings."} <Src page={87} /></div>
        </div>
      </div>
      <div className="grid">
        {archetypes.map((a) => <div key={a.name} className="card"><div className="row" style={{ justifyContent: "space-between" }}><h3>{a.name}</h3><Src page={a.page} /></div><p className="small" style={{ marginTop: 6 }}>{a.text}</p></div>)}
      </div>
    </div>
  );
}

function Methods() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const m = methods[i];
  const opts = Object.keys(methodNotes) as (keyof typeof methodNotes)[];
  return (
    <div className="stack" style={{ maxWidth: 720 }}>
      <div className="card rise" key={i}>
        <div className="eyebrow">Study {i + 1} of {methods.length}: which method?</div>
        <p className="prose" style={{ margin: "10px 0" }}>{m.scenario}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 6 }}>
          {opts.map((o) => <button key={o} className={`opt ${pick && o === m.answer ? "right" : ""} ${pick === o && o !== m.answer ? "wrong" : ""}`} style={{ marginTop: 0 }} disabled={!!pick} onClick={() => setPick(o)}>{o}</button>)}
        </div>
        {pick && <div className="explain"><strong>{m.answer}.</strong> {methodNotes[m.answer as keyof typeof methodNotes].text} <Src page={m.page} />
          <div style={{ marginTop: 8 }}><button className="btn primary" onClick={() => { setPick(null); setI((i + 1) % methods.length); }}>Next study</button></div></div>}
      </div>
    </div>
  );
}

function Birth() {
  const [i, setI] = useState(0);
  const b = birthOrder[i];
  return (
    <div className="stack">
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))" }}>
        {birthOrder.map((x, k) => (
          <button key={x.pos} className="card" onClick={() => setI(k)} aria-pressed={k === i}
            style={{ cursor: "pointer", font: "inherit", color: "inherit", textAlign: "left", borderColor: k === i ? "var(--accent)" : undefined, background: k === i ? "var(--accent-soft)" : undefined }}>
            <div className="row" style={{ gap: 4 }}>{Array.from({ length: k === 3 ? 1 : 3 }, (_, n) => (
              <span key={n} style={{ width: 12 + (k === 3 ? 6 : (2 - n) * 5), height: 12 + (k === 3 ? 6 : (2 - n) * 5), borderRadius: 99, display: "inline-block", alignSelf: "flex-end",
                background: (k === 0 && n === 0) || (k === 1 && n === 1) || (k === 2 && n === 2) || k === 3 ? "var(--accent)" : "var(--line)" }} />))}</div>
            <strong style={{ display: "block", marginTop: 8 }}>{x.pos}</strong>
          </button>
        ))}
      </div>
      <div className="card rise" key={b.pos}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2>{b.pos}</h2><Src page={b.page} /></div>
        <p style={{ marginTop: 8 }}><strong>Situation.</strong> {b.situation}</p>
        <p style={{ marginTop: 8 }}><strong>Likely style of life.</strong> {b.traits} <Src page={b.traitsPage} /></p>
        {b.example && <div className="explain">{b.example}</div>}
      </div>
      <p className="small muted">{birthOrderNote.text} <Src page={birthOrderNote.page} /></p>
    </div>
  );
}

function Horney() {
  const [i, setI] = useState(0);
  const t = horneyTrends[i];
  // Arrow directions for toward / against / away
  const arrows = [
    { d: "M60 90 L150 90", lbl: "toward", x: 105, y: 80 },
    { d: "M300 90 L210 90", lbl: "against", x: 255, y: 80 },
    { d: "M180 120 L180 175", lbl: "away", x: 196, y: 155 },
  ];
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
      <div className="card">
        <svg viewBox="0 0 360 200" width="100%" role="img" aria-label="Horney's three neurotic trends">
          <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" /></marker></defs>
          <circle cx="40" cy="90" r="22" fill="var(--sunk)" stroke="var(--line)" /><text x="40" y="94" textAnchor="middle" fontSize="11" fill="var(--muted)">others</text>
          <circle cx="320" cy="90" r="22" fill="var(--sunk)" stroke="var(--line)" /><text x="320" y="94" textAnchor="middle" fontSize="11" fill="var(--muted)">others</text>
          <circle cx="180" cy="90" r="28" fill="var(--accent-soft)" stroke="var(--accent)" /><text x="180" y="94" textAnchor="middle" fontSize="12" fill="var(--ink)">self</text>
          {i === 0 && <path d="M150 90 L66 90" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#ah)" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" /></path>}
          {i === 1 && <path d="M210 90 L294 90" stroke="var(--bad)" strokeWidth="3" markerEnd="url(#ah)" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.6s" repeatCount="indefinite" /></path>}
          {i === 2 && <path d="M180 120 L180 185" stroke="var(--muted)" strokeWidth="3" markerEnd="url(#ah)" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.4s" repeatCount="indefinite" /></path>}
          <text x={arrows[i].x} y={arrows[i].y} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">moving {arrows[i].lbl}</text>
        </svg>
        <div className="tabs" style={{ marginTop: 8 }}>{horneyTrends.map((x, k) => <button key={x.type} aria-selected={k === i} onClick={() => setI(k)}>{x.type.replace(" personality", "")}</button>)}</div>
      </div>
      <div className="card rise" key={t.type}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2>{t.type}</h2><Src page={t.page} /></div>
        <div className="row" style={{ margin: "8px 0" }}><span className="chip acc">{t.trend}</span><span className="chip">≈ {t.adler}</span></div>
        <p>{t.text}</p>
        <table style={{ marginTop: 10 }}><tbody>
          <tr><td className="muted small" style={{ width: "40%" }}>Self-protective device</td><td>{t.protect} <Src pages={[140, 141]} /></td></tr>
          <tr><td className="muted small">Neurotic needs it groups</td><td>{t.needs} <Src page={142} /></td></tr>
        </tbody></table>
      </div>
      <div className="card" style={{ gridColumn: "1 / -1" }}>
        {horneyNotes.map((n) => <p key={n.page} style={{ marginTop: 6 }}>{n.text} <Src page={n.page} /></p>)}
      </div>
    </div>
  );
}

const FREUD_PARALLEL = ["Freud's oral stage", "Freud's anal stage", "Freud's phallic stage", "Freud's latency period"];
function Erikson() {
  const [i, setI] = useState(0);
  const s = eriksonStages[i];
  return (
    <div className="stack">
      <div className="card">
        <div className="eyebrow" style={{ marginBottom: 10 }}>The life span · tap a stage (Table 6.1 <Src page={164} />)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, minmax(0, 1fr))", gap: 4 }}>
          {eriksonStages.map((x, k) => (
            <button key={x.stage} onClick={() => setI(k)} aria-pressed={k === i} title={x.crisis}
              style={{ border: 0, cursor: "pointer", padding: "10px 2px", borderRadius: 8, font: "inherit", fontSize: ".72rem", lineHeight: 1.2,
                background: k === i ? "var(--accent)" : k < i ? "var(--accent-soft)" : "var(--sunk)", color: k === i ? "var(--accent-ink)" : "var(--ink)", transition: "background .25s" }}>
              <strong style={{ display: "block", fontSize: ".82rem" }}>{k + 1}</strong>{x.ages}
            </button>
          ))}
        </div>
      </div>
      <div className="card rise" key={s.stage}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2>{s.stage}</h2><span className="row"><span className="chip acc">Ages {s.ages}</span><Src page={s.page} /></span></div>
        <h3 style={{ marginTop: 10 }}>{s.crisis}</h3>
        {i < 4 && <p className="small muted">Parallels {FREUD_PARALLEL[i]} <Src page={s.page} /></p>}
        <div className="explain"><strong>Basic strength: {s.strength}.</strong> {s.def} <Src page={s.strengthPage} /></div>
        <div className="grid" style={{ marginTop: 12 }}>
          <div className="sunk"><div className="eyebrow">Too much of the adaptive side</div><strong>{s.mal[0]}</strong></div>
          <div className="sunk"><div className="eyebrow">Too much of the maladaptive side</div><strong>{s.mal[1]}</strong></div>
        </div>
        <p className="small muted" style={{ marginTop: 8 }}>Maldevelopment from Table 6.2 <Src page={171} />. Each crisis is a turning point: resolving it well brings the stage&apos;s basic strength.</p>
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>← Previous</button>
          <button className="btn primary" disabled={i === 7} onClick={() => setI(i + 1)}>Next stage →</button>
        </div>
      </div>
    </div>
  );
}

function EganModel() {
  const [pick, setPick] = useState("I-A");
  const stage = model.stages.find((st) => st.tasks.some((t) => t.id === pick))!;
  const task = stage.tasks.find((t) => t.id === pick)!;
  return (
    <div className="stack">
      <div className="card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 }}>
          {model.stages.map((st) => (
            <div key={st.id} className="sunk" style={{ padding: 12 }}>
              <div className="eyebrow">{st.name}</div>
              <div className="small muted" style={{ margin: "2px 0 8px" }}>“{st.q}”</div>
              {st.tasks.map((t) => (
                <button key={t.id} onClick={() => setPick(t.id)} aria-pressed={pick === t.id} className="btn" style={{ width: "100%", justifyContent: "flex-start", marginTop: 6, background: pick === t.id ? "var(--accent)" : undefined, color: pick === t.id ? "var(--accent-ink)" : undefined, borderColor: pick === t.id ? "var(--accent)" : undefined }}>
                  <strong>{t.id}</strong>&nbsp;{t.name}
                </button>
              ))}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 600 40" width="100%" style={{ marginTop: 12 }} role="img" aria-label="The action arrow under all three stages">
          <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--good)" /></marker></defs>
          <line x1="10" y1="20" x2="585" y2="20" stroke="var(--good)" strokeWidth="6" markerEnd="url(#arr)" strokeDasharray="14 8"><animate attributeName="stroke-dashoffset" from="44" to="0" dur="1.6s" repeatCount="indefinite" /></line>
          <text x="300" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">ACTION ARROW — ongoing client action leading to preferred outcomes</text>
        </svg>
      </div>
      <div className="card rise" key={task.id}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2>Task {task.id}: {task.name}</h2><Src page={task.page} /></div>
        <p className="prose" style={{ marginTop: 8 }}>The client asks: “{task.q}”</p>
        <p className="small muted" style={{ marginTop: 6 }}>{stage.aim} <Src page={stage.page} /></p>
        <div className="row" style={{ marginTop: 10 }}><Link className="btn" href={`/read/egan/${task.ch}`}>Read Egan Chapter {task.ch}</Link></div>
      </div>
      <div className="card"><p>{model.arrow.text} <Src page={model.arrow.page} /></p><p style={{ marginTop: 6 }}>{model.nonlinear.text} <Src page={model.nonlinear.page} /></p></div>
    </div>
  );
}

function Soler() {
  const [i, setI] = useState(0);
  const x = soler[i];
  return (
    <div className="stack" style={{ maxWidth: 760 }}>
      <div className="row" style={{ gap: 8 }}>
        {soler.map((l, k) => (
          <button key={l.letter} onClick={() => setI(k)} aria-pressed={k === i} aria-label={l.name}
            style={{ width: 64, height: 64, borderRadius: 14, border: "1px solid var(--line)", cursor: "pointer", font: "inherit", fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700,
              background: k === i ? "var(--accent)" : "var(--surface)", color: k === i ? "var(--accent-ink)" : "var(--ink)", transform: k === i ? "translateY(-3px)" : "none", transition: "all .2s" }}>{l.letter}</button>
        ))}
      </div>
      <div className="card rise" key={x.letter}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2>{x.name}</h2><Src page={x.page} /></div>
        <p style={{ marginTop: 8 }}>{x.text}</p>
      </div>
      <div className="card">{solerNotes.map((n) => <p key={n.text} className="small" style={{ marginTop: 6 }}>{n.text} <Src page={n.page} /></p>)}</div>
    </div>
  );
}

function Substitutes() {
  const [seed, setSeed] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const order = useMemo(() => (mounted ? shuffle(substitutes) : substitutes), [seed, mounted]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const d = order[i];
  const next = () => { setPick(null); if (i + 1 < order.length) setI(i + 1); else { setSeed((v) => v + 1); setI(0); setScore(0); } };
  return (
    <div className="stack" style={{ maxWidth: 760 }}>
      <div className="card"><div className="eyebrow">The case</div><p className="prose" style={{ marginTop: 6, fontSize: "1rem" }}>{rami.story} <Src page={rami.page} /></p></div>
      <div className="sunk row" style={{ justifyContent: "space-between" }}><span>Response {i + 1} of {order.length}</span><strong>{score} correct</strong></div>
      <div className="card rise" key={d.name + seed}>
        <div className="eyebrow">Which poor substitute for empathy is this?</div>
        <p className="prose" style={{ margin: "10px 0 6px" }}>{d.example}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 6, marginTop: 12 }}>
          {substitutes.map((x) => (
            <button key={x.name} className={`opt ${pick && x.name === d.name ? "right" : ""} ${pick === x.name && x.name !== d.name ? "wrong" : ""}`} style={{ marginTop: 0 }} disabled={!!pick}
              onClick={() => { setPick(x.name); if (x.name === d.name) setScore((v) => v + 1); }}>{x.name}</button>
          ))}
        </div>
        {pick && <div className="explain"><strong>{d.name}.</strong> {d.why} <Src page={d.page} /><div style={{ marginTop: 8 }}><button className="btn primary" onClick={next}>{i + 1 < order.length ? "Next response" : "Play again"}</button></div></div>}
      </div>
    </div>
  );
}
