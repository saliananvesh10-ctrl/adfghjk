import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for (const id of ['cognitive','research']){
 const chapters=JSON.parse(readFileSync(`src/content/new/${id}.json`));
 const coverage=JSON.parse(readFileSync(`src/content/new/${id}-coverage.json`));
 assert.equal(chapters.length,5);
 assert.equal(coverage.length,chapters.reduce((n,c)=>n+c.sections.length,0));
 for (const c of chapters){
  assert(c.sections.length>=6);assert(c.sections.every(s=>s.detailed.length>350));
  assert.equal(new Set(c.sections.map(s=>s.id)).size,c.sections.length);
  for(const q of [...c.checks,...c.assessment]){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.answer>=0&&q.answer<4);assert(c.sections.some(s=>s.id===q.sectionId));}
  assert(c.pages.every(p=>p===0),'Study notes must not invent textbook pagination');
 }
 console.log(`${id}: five units; coverage, section IDs, question shape and uncited-note labels checked`);
}
const passages=JSON.parse(readFileSync('src/lib/source-corpus.json'));
assert(passages.length>500);assert(passages.every(p=>p.pages.startsWith('PDF page ')&&p.text.length>120));
console.log(`${passages.length} bounded source passages labelled with PDF indices`);
