import type { Subject } from "./types";
import { personality } from "./personality";
import { egan } from "./egan";
import { cognitive, research } from "./new";
import { personalitySyllabus } from "./personality-syllabus";

// Every textbook in the app. Add a subject: create src/content/<id>/index.ts and list it here.
export const subjects: Subject[] = [personality, personalitySyllabus, egan, cognitive, research];

export const getSubject = (id: string | undefined) => subjects.find((s) => s.id === id);
export const getChapter = (sid: string, n: number) => getSubject(sid)?.chapters.find((c) => c.number === n);
export const meta = ({ id, short, paper, name }: Subject) => ({ id, short, paper, name });

// What's in the course folder and what happened to each item (shown on the Source library page).
export const inventory: { paper: string; source: string; status: "used" | "awaiting" | "unusable" | "missing"; note: string }[] = [
  { paper: "Theories of Personality", source: "Syllabus additions: Fromm, Bowlby, Klein, Lewin, McClelland and May", status: "used", note: "Six original study guides mapped to syllabus Units 2 and 5; each ends in a reasoned six-criterion appraisal. External reading links are provided; these are not verified textbook score tables." },
  { paper: "Theories of Personality", source: "Schultz & Schultz, Theories of Personality, 11th ed. (Cengage, 2017)", status: "used", note: "Full text; page tags checked against the printed page numbers on every page." },
  { paper: "Theories of Personality", source: "Calvin S. Hall (PDF in the folder)", status: "unusable", note: "No readable text layer and too large to fetch. Nothing from it is in the app." },
  { paper: "Introduction to Counselling", source: "Egan, The Skilled Helper, 10th ed. (Cengage, 2012)", status: "used", note: "Full text from the PDF; page numbers mapped from the printed page numbers." },
  { paper: "Introduction to Counselling", source: "Gladding, Counseling (8th ed.)", status: "awaiting", note: "Too large to fetch from Drive. Needs a text upload." },
  { paper: "Quantitative Research Methods", source: "Eight supplied PDFs: lecture slides, Kothari, A. K. Singh and Creswell", status: "used", note: "Text extracted. Concise original syllabus notes across five units; PDF-index source suggestions are separate from verified printed citations." },
  { paper: "Advanced Cognitive Psychology", source: "Galotti, Matlin, Sternberg and Cognitive Neuroscience (Gazzaniga)", status: "used", note: "Text extracted. Five units of original study notes. DICE and Indian consciousness models need confirmation against lecturer materials." },
  { paper: "New papers", source: "Syllabi supplied in conversation", status: "used", note: "Ten units mapped on the Syllabus coverage page. Notes cover topic groups; they are not exhaustive textbook coverage or official model answers." },
];
