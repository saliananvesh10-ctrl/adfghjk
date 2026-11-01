import { withUid, type Subject } from '../types';
import cognitiveData from './cognitive.json';
import researchData from './research.json';
const make = (id: string, short: string, paper: string, data: typeof cognitiveData): Subject => ({
 id, short, paper, name: paper,
 source: { title: 'Syllabus study notes and supplied reading collection', author: 'Original study guide', publisher: 'Course materials', year: 2026 },
 outline: data.map(c => ({number:c.number,title:c.title,theorist:null,approach:c.approach,pages:[0,0] as const})),
 chapters: withUid(id,data),
});
export const cognitive = make('cognitive','Cognitive notes','Advanced Cognitive Psychology',cognitiveData);
export const research = make('research','Research notes','Quantitative Research Methods',researchData);
