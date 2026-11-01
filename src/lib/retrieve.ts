import { subjects } from "@/content";
import sourceCorpus from "./source-corpus.json";

// Keyword retrieval (BM25) over section texts, term definitions and findings of every textbook.
// ponytail: in-memory BM25 over a few thousand chunks; move to pgvector embeddings if it gets slow or misses paraphrased questions.
export interface Chunk { sid: string; ch: number; title: string; pages: string; text: string }

const STOP = new Set("a an the and or of to in on for is are was were be by with as at that this it its from what how why who which does do did can explain describe discuss compare between about".split(" "));
const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

const chunks: Chunk[] = subjects.flatMap((sub) => sub.chapters.flatMap((c) => {
  const base = { sid: sub.id, ch: c.number }, tag = `${sub.short} Ch ${c.number}`, range = c.pages[0] === 0 ? "Original syllabus study note; no verified pagination" : `pp. ${c.pages[0]}–${c.pages[1]}`;
  return [
    ...c.sections.map((s) => ({ ...base, title: `${tag} · ${s.heading}`, pages: s.pages[0] === 0 ? "Original syllabus note; no verified textbook page citation" : `${sub.short} pp. ${s.pages[0]}–${s.pages[1]}`, text: `${s.detailed}\nKey points: ${s.keyPoints.join("; ")}` })),
    { ...base, title: `${tag} · Key terms`, pages: `${sub.short} ${range}`, text: c.terms.map((t) => `${t.term}${t.page ? ` (p. ${t.page})` : " (original study note)"}: ${t.definition}`).join("\n") },
    ...(c.studies.length ? [{ ...base, title: `${tag} · Research findings`, pages: `${sub.short} ${range}`, text: c.studies.map((t) => `${t.title} (p. ${t.page}): ${t.finding}`).join("\n") }] : []),
  ];
}));
chunks.push(...sourceCorpus);
const docs = chunks.map((c) => tok(`${c.title} ${c.text}`));
const avgLen = docs.reduce((a, d) => a + d.length, 0) / Math.max(1, docs.length);
const df = new Map<string, number>();
docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));

export function retrieve(query: string, k = 5, sid?: string, ch?: number): Chunk[] {
  const synonyms: Record<string,string> = { stm: "short term memory", ltm: "long term memory", fmri: "neuroimaging blood oxygenation", dice: "dissociable interactions conscious experience", broadbent: "filter attention bottleneck", eyewitness: "misinformation testimony", koshas: "vedic consciousness", mixed: "mixed methods integration convergent sequential" };
  const expanded = query + " " + tok(query).map(w => synonyms[w] || "").join(" ");
  const q = [...new Set(tok(expanded))];
  return chunks
    .map((c, i) => {
      if ((sid && c.sid !== sid) || (ch && c.ch !== ch)) return { c, score: 0 };
      const d = docs[i]; let score = 0;
      for (const w of q) {
        const f = d.filter((x) => x === w).length; if (!f) continue;
        const n = df.get(w) ?? 0;
        score += Math.log(1 + (chunks.length - n + 0.5) / (n + 0.5)) * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * d.length / avgLen));
      }
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.c);
}

export const books = subjects.map((s) => `${s.short}: ${s.source.author}, ${s.source.title} (${s.paper})`).join("; ");
