// Content schema for one textbook chapter. Every item that states a fact
// carries `page` / `pages` from the source book so the reader can check it.
export type Pages = [number, number];

export interface Section {
  id: string;            // kebab-case, unique within the chapter
  heading: string;       // the book's section heading
  pages: Pages;
  references?: { source: string; pdfPages: number[]; status: string }[];
  coverage?: string;
  detailed: string;      // own-words explanation, paragraphs separated by \n\n
  simple: string;        // plain-language version, 2-4 sentences
  keyPoints: string[];   // 3-6 bullets
}

export interface Term { term: string; definition: string; page: number }
export interface Person { name: string; contribution: string; page: number }
export interface Study { title: string; finding: string; page: number }
export interface Example { title: string; text: string; supplementary: true }

export interface MCQ {
  q: string;
  options: string[];     // exactly 4
  answer: number;        // index into options
  explain: string;
  page: number;
  sectionId?: string;    // set for comprehension checks
}

export interface PracticeQ {
  q: string;
  marks: 2 | 5 | 10;
  answer: string;        // model answer, paragraphs separated by \n\n
  pages: Pages;
}

export interface Card { front: string; back: string; page: number }

export interface Chapter {
  uid: string;           // "<subjectId>-<number>", added by the registry (not in JSON)
  number: number;
  title: string;
  theorist: string | null;
  approach: string;
  pages: Pages;
  overview: string;
  objectives: string[];
  sections: Section[];
  terms: Term[];
  people: Person[];
  studies: Study[];
  examples: Example[];
  checks: MCQ[];         // comprehension checks, each with sectionId
  practice: PracticeQ[];
  flashcards: Card[];
  summary: string[];
  assessment: MCQ[];     // final chapter test
}

export interface OutlineItem { number: number; title: string; theorist: string | null; approach: string; pages: readonly [number, number] }

// One subject = one textbook. `paper` groups books that belong to the same exam paper.
export interface Subject {
  id: string;
  short: string;         // citation prefix, e.g. "Schultz"
  paper: string;         // e.g. "Theories of Personality"
  name: string;          // the book's title
  source: { title: string; author: string; publisher: string; year: number };
  outline: readonly OutlineItem[];
  chapters: Chapter[];
}
export type SubjectMeta = Pick<Subject, "id" | "short" | "paper" | "name">;

// JSON chapters lack `uid`; the registry adds it.
export const withUid = (sid: string, cs: unknown[]) => (cs as Chapter[]).map((c) => ({ ...c, uid: `${sid}-${c.number}` }));
export const parseUid = (uid: string) => { const i = uid.lastIndexOf("-"); return { s: uid.slice(0, i), n: Number(uid.slice(i + 1)) }; };

// Trimmed chapter shapes passed from server pages to client views, so a page
// only ships the content it actually renders.
export type Lite = Pick<Chapter, "uid" | "number" | "title" | "theorist"> & {
  sections: Pick<Section, "id" | "heading">[];
  checks: Pick<MCQ, "sectionId">[];
  flashcards: unknown[];
};
export type WithQuiz = Pick<Chapter, "uid" | "number" | "title" | "assessment" | "checks">;
export type WithCards = Pick<Chapter, "uid" | "number" | "title" | "theorist" | "flashcards">;
export type WithPractice = Pick<Chapter, "uid" | "number" | "title" | "theorist" | "practice">;
export type WithRevision = Pick<Chapter, "uid" | "number" | "title" | "pages" | "summary" | "terms"> & { sections: Pick<Section, "id" | "heading">[] };
