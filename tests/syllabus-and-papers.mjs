import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import ts from 'typescript';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const cs=read('src/content/personality-syllabus/chapters.json');
const criteria=read('src/content/personality-syllabus/criteria.json').map(x=>x.criterion);
assert.deepEqual(cs.map(x=>x.theorist),['Erich Fromm','John Bowlby','Melanie Klein','Kurt Lewin','David McClelland','Rollo May']);
for(const [i,c] of cs.entries()){
 assert(c.approach.startsWith(i<3?'Unit 2':'Unit 5'));
 assert.equal(c.sections.at(-1).id,'six-criteria-evaluation');
 assert.deepEqual(c.sections.at(-1).evaluationRows.map(x=>x.criterion),criteria);
 assert.deepEqual(c.practice.map(x=>x.marks),[2,8,14]);
 assert(c.sourceLinks.length>0&&c.sourceLinks.every(x=>x.url.startsWith('https://')));
 assert(c.sections.every(x=>x.pages[0]===0),'No invented textbook citations');
 for(const q of c.checks){assert.equal(new Set(q.options).size,4);assert(q.answer>=0&&q.answer<4);assert(c.sections.some(x=>x.id===q.sectionId));}
}
console.log('PASS six theorists, syllabus units, end-of-theory evaluations and practice marks');
const qs=read('src/content/past-papers/questions.json');assert.equal(qs.length,136);assert.equal(new Set(qs.map(x=>x.id)).size,136);
const code=ts.transpileModule(readFileSync('src/lib/paper-selection.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const exports={};new Function('exports',code)(exports);
for(const sitting of ['jan','nov'])for(const paper of ['personality','cognitive','research','counselling']){
 const rows=qs.filter(x=>x.sitting===sitting&&x.paper===paper);
 assert.equal(rows.length,17);
 assert.deepEqual([2,8,14].map(n=>rows.filter(q=>q.marks===n).length),[8,3,6]);
 const start=sitting==='jan'||['personality','cognitive'].includes(paper)?2:1;
 assert.deepEqual(rows.filter(q=>q.marks===8).map(q=>q.ref),[start,start+1,start+2].map(n=>'II '+n));
 const good=[...rows.filter(q=>q.marks===2).slice(0,6),...rows.filter(q=>q.marks===8).slice(0,2),...rows.filter(q=>q.marks===14&&q.ref.endsWith('a'))];
 assert.equal(good.reduce((n,x)=>n+x.marks,0),70);assert(exports.validPaperSelection(good));
 assert(!exports.validPaperSelection(good.slice(1)));
 const invalid=[...good.filter(x=>x.choice!==2),rows.find(x=>x.choice===1&&x.ref.endsWith('b'))];assert(!exports.validPaperSelection(invalid),'Must reject both sides of one essay pair');
 for(const q of rows){const [,s,n]=q.reading.split('/').slice(1);/* validated below with explicit path split */
 const parts=q.reading.split('/');const sid=parts[2],number=Number(parts[3]);
 if(sid==='personality-syllabus')assert(cs.some(c=>c.number===number));else if(sid==='cognitive'||sid==='research')assert(read(`src/content/new/${sid}.json`).some(c=>c.number===number));else assert(existsSync(`src/content/${sid}/ch${String(number).padStart(2,'0')}.json`));
 }
}
console.log('PASS eight source-paper maps, 136 reading links, source numbering and 70-mark selection rules');
