import type { Chapter, Lite } from "@/content/types";

// Small per-chapter shape for overview pages (dashboard, progress).
export const lite = (c: Chapter): Lite => ({
  uid: c.uid, number: c.number, title: c.title, theorist: c.theorist,
  sections: c.sections.map(({ id, heading }) => ({ id, heading })),
  checks: c.checks.map(({ sectionId }) => ({ sectionId })),
  flashcards: c.flashcards.map(() => 0),
});
