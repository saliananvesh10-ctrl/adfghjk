// Usage: node scripts/validate.mjs src/content/personality/ch01.json [...]
// Checks shape, minimum counts, and that every page ref sits inside the chapter.
import { readFileSync } from "node:fs";

const MIN = { objectives: 4, sections: 4, terms: 10, checks: 6, practice: 4, flashcards: 15, summary: 6, assessment: 10 };
let failed = 0;

for (const file of process.argv.slice(2)) {
  const errs = [];
  const c = JSON.parse(readFileSync(file, "utf8"));
  const [lo, hi] = c.pages ?? [];
  const inRange = (p, where) => {
    if (!Number.isInteger(p) || p < lo || p > hi) errs.push(`${where}: page ${p} outside ${lo}-${hi}`);
  };
  const str = (v, where) => { if (typeof v !== "string" || !v.trim()) errs.push(`${where}: empty`); };

  for (const k of ["number", "title", "approach", "overview"]) if (c[k] == null) errs.push(`missing ${k}`);
  for (const [k, n] of Object.entries(MIN)) if (!Array.isArray(c[k]) || c[k].length < n) errs.push(`${k}: need >= ${n}, got ${c[k]?.length ?? 0}`);

  const ids = new Set();
  (c.sections ?? []).forEach((s, i) => {
    const w = `sections[${i}]`;
    if (ids.has(s.id)) errs.push(`${w}: duplicate id ${s.id}`);
    ids.add(s.id);
    ["heading", "detailed", "simple"].forEach((k) => str(s[k], `${w}.${k}`));
    inRange(s.pages?.[0], w); inRange(s.pages?.[1], w);
    if (!(s.keyPoints?.length >= 3)) errs.push(`${w}: keyPoints < 3`);
  });
  for (const k of ["terms", "people", "studies", "flashcards"])
    (c[k] ?? []).forEach((x, i) => inRange(x.page, `${k}[${i}]`));
  for (const k of ["checks", "assessment"])
    (c[k] ?? []).forEach((m, i) => {
      const w = `${k}[${i}]`;
      if (m.options?.length !== 4) errs.push(`${w}: need 4 options`);
      if (!(m.answer >= 0 && m.answer < 4)) errs.push(`${w}: bad answer index`);
      str(m.explain, `${w}.explain`);
      inRange(m.page, w);
      if (k === "checks" && !ids.has(m.sectionId)) errs.push(`${w}: unknown sectionId ${m.sectionId}`);
    });
  (c.practice ?? []).forEach((p, i) => {
    if (![2, 5, 10].includes(p.marks)) errs.push(`practice[${i}]: marks must be 2/5/10`);
    inRange(p.pages?.[0], `practice[${i}]`); inRange(p.pages?.[1], `practice[${i}]`);
  });
  (c.examples ?? []).forEach((e, i) => { if (e.supplementary !== true) errs.push(`examples[${i}]: supplementary must be true`); });
  // answer-position balance: catches "always B" quizzes
  const pos = [0, 0, 0, 0];
  [...(c.checks ?? []), ...(c.assessment ?? [])].forEach((m) => pos[m.answer]++);
  const total = pos.reduce((a, b) => a + b, 0);
  if (total && Math.max(...pos) / total > 0.45) errs.push(`answer positions unbalanced: ${pos}`);

  console.log(errs.length ? `FAIL ${file}\n  ${errs.join("\n  ")}` : `ok   ${file}`);
  if (errs.length) failed++;
}
process.exit(failed ? 1 : 0);
