import { withUid, type Subject } from '../types';
import chapters from './chapters.json';
export const personalitySyllabus: Subject = {
 id:'personality-syllabus',short:'Syllabus supplement',paper:'Theories of Personality',name:'Additional syllabus theorists',
 source:{title:'Original syllabus study notes with external reading links',author:'Course study guide',publisher:'Study materials',year:2026},
 outline:chapters.map(c=>({number:c.number,title:c.title,theorist:c.theorist,approach:c.approach,pages:[0,0] as const})),
 chapters:withUid('personality-syllabus',chapters),
};
