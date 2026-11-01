"use client";
import type { Lite, SubjectMeta } from "@/content/types";
import { useEffect, useState } from "react";
import { useProgress, update, sectionKey, supabase, pull } from "@/lib/progress";
import { Bar } from "@/components/ui";

type Group = { meta: SubjectMeta; chapters: Lite[] };

export default function Progress({ groups }: { groups: Group[] }) {
  const s = useProgress();
  const chapters = groups.flatMap((g) => g.chapters.map((c) => ({ ...c, sid: g.meta.id, short: g.meta.short })));
  return (
    <div className="stack" style={{ maxWidth: 900 }}>
      <div><div className="eyebrow">Progress</div><h1>How you&apos;re doing</h1></div>
      {groups.filter((g) => g.chapters.length).map((g) => (
        <div key={g.meta.id} className="card table-wrap">
          <div className="eyebrow">{g.meta.paper}</div>
          <h2 style={{ margin: "2px 0 8px" }}>{g.meta.name}</h2>
          <table>
            <thead><tr><th>Chapter</th><th>Reading</th><th>Section checks</th><th>Chapter test</th><th>Cards mastered</th></tr></thead>
            <tbody>
              {g.chapters.map((c) => {
                const read = c.sections.filter((x) => s.read[sectionKey(c.uid, x.id)]).length;
                const tried = c.checks.filter((_, i) => s.checks[`${c.uid}:${i}`] !== undefined).length;
                const right = c.checks.filter((_, i) => s.checks[`${c.uid}:${i}`]).length;
                const mastered = c.flashcards.filter((_, i) => (s.cards[`${c.uid}:${i}`]?.box ?? 0) >= 3).length;
                return (
                  <tr key={c.uid}>
                    <td><strong>Ch {c.number}</strong> <span className="muted small">{c.theorist ?? c.title}</span></td>
                    <td style={{ minWidth: 120 }}><Bar value={(read / c.sections.length) * 100} /><span className="small muted">{read}/{c.sections.length}</span></td>
                    <td>{tried ? `${right}/${tried} right` : "—"}</td>
                    <td>{s.quizBest[c.uid] != null ? `${s.quizBest[c.uid]}%` : "—"}</td>
                    <td>{mastered}/{c.flashcards.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
      <Weak chapters={chapters} />
      <Sync />
      <div className="card">
        <div className="eyebrow">Reset</div>
        <p className="small muted" style={{ margin: "6px 0 10px" }}>Clears reading, scores, cards, bookmarks and highlights on this device.</p>
        <button className="btn" onClick={() => confirm("Clear all progress on this device?") && update(() => ({ read: {}, checks: {}, quizBest: {}, cards: {}, bookmarks: [], highlights: [], last: null, updatedAt: 0 }))}>Reset progress</button>
      </div>
    </div>
  );
}

// Sections where you missed a comprehension check: the places to reread.
function Weak({ chapters }: { chapters: (Lite & { sid: string; short: string })[] }) {
  const s = useProgress();
  const weak = chapters.flatMap((c) => c.checks.map((m, i) => ({ c, m, ok: s.checks[`${c.uid}:${i}`] })).filter((x) => x.ok === false))
    .map(({ c, m }) => ({ c, sec: c.sections.find((x) => x.id === m.sectionId) }))
    .filter((x, i, a) => x.sec && a.findIndex((y) => y.sec?.id === x.sec?.id && y.c.uid === x.c.uid) === i);
  return (
    <div className="card">
      <div className="eyebrow">Reread these</div>
      {weak.length ? weak.map(({ c, sec }) => <div key={`${c.uid}${sec!.id}`} style={{ marginTop: 8 }}><a href={`/read/${c.sid}/${c.number}#${sec!.id}`}>{c.short} Ch {c.number}: {sec!.heading}</a></div>)
        : <p className="small muted" style={{ marginTop: 6 }}>No missed section checks yet.</p>}
    </div>
  );
}

function Sync() {
  const [email, setEmail] = useState(""); const [user, setUser] = useState<string | null>(null); const [msg, setMsg] = useState("");
  const sb = supabase();
  useEffect(() => {
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => { setUser(data.user?.email ?? null); if (data.user) pull(); });
    const { data } = sb.auth.onAuthStateChange((_e, sess) => { setUser(sess?.user?.email ?? null); if (sess?.user) pull(); });
    return () => data.subscription.unsubscribe();
  }, [sb]);
  if (!sb) return null;
  return (
    <div className="card">
      <div className="eyebrow">Sync across devices</div>
      {user ? (
        <div className="row" style={{ marginTop: 8 }}><span>Signed in as <strong>{user}</strong>. Progress syncs automatically.</span><button className="btn" onClick={() => sb.auth.signOut()}>Sign out</button></div>
      ) : (
        <form className="row" style={{ marginTop: 8 }} onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/progress` } });
          setMsg(error ? error.message : "Check your email for the sign-in link.");
        }}>
          <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ maxWidth: 280 }} />
          <button className="btn primary">Email me a link</button>
          {msg && <span className="small muted">{msg}</span>}
        </form>
      )}
    </div>
  );
}
