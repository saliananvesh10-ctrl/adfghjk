// Usage: node scripts/register.mjs
// Rewrites the chNN.json imports in every src/content/<subject>/index.ts so each
// subject lists exactly the chapter files that exist. Run after adding a chapter.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";

const root = "src/content";
for (const sid of readdirSync(root)) {
  const dir = `${root}/${sid}`;
  if (!statSync(dir).isDirectory()) continue;
  const idx = `${dir}/index.ts`;
  let s = readFileSync(idx, "utf8");
  if (!s.includes("withUid(")) continue;
  const files = readdirSync(dir).filter((f) => /^ch\d\d\.json$/.test(f)).sort();
  const names = files.map((f) => f.slice(0, -5));
  s = s.replace(/(import ch\d\d from "\.\/ch\d\d\.json";\n)+/, "");
  s = s.replace(/(import [^\n]*from "\.\.\/types";\n)/, `$1${files.map((f, i) => `import ${names[i]} from "./${f}";\n`).join("")}`);
  s = s.replace(/withUid\("([^"]+)", \[[^\]]*\]\)/, `withUid("$1", [${names.join(", ")}])`);
  writeFileSync(idx, s);
  console.log(`${sid}: ${names.join(" ") || "(none)"}`);
}
