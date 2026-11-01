// Full table of contents (from the book's contents page). Chapters without
// written content show as "pending" everywhere in the app.
import type { OutlineItem } from "../types";

export const outline: readonly OutlineItem[] = [
  { number: 1, title: "Personality: What It Is and Why You Should Care", theorist: null, approach: "Introduction", pages: [1, 34] },
  { number: 2, title: "Sigmund Freud: Psychoanalysis", theorist: "Sigmund Freud", approach: "Psychoanalytic", pages: [37, 78] },
  { number: 3, title: "Carl Jung: Analytical Psychology", theorist: "Carl Jung", approach: "Neo-psychoanalytic", pages: [81, 107] },
  { number: 4, title: "Alfred Adler: Individual Psychology", theorist: "Alfred Adler", approach: "Neo-psychoanalytic", pages: [108, 134] },
  { number: 5, title: "Karen Horney: Neurotic Needs and Trends", theorist: "Karen Horney", approach: "Neo-psychoanalytic", pages: [135, 155] },
  { number: 6, title: "Erik Erikson: Identity Theory", theorist: "Erik Erikson", approach: "Life-span", pages: [159, 190] },
  { number: 7, title: "Gordon Allport: Motivation and Personality", theorist: "Gordon Allport", approach: "Genetics", pages: [193, 212] },
  { number: 8, title: "Cattell, Eysenck, the Five-Factor Theory, HEXACO and the Dark Triad", theorist: "Cattell & Eysenck", approach: "Genetics", pages: [213, 244] },
  { number: 9, title: "Abraham Maslow: Needs-Hierarchy Theory", theorist: "Abraham Maslow", approach: "Humanistic", pages: [247, 270] },
  { number: 10, title: "Carl Rogers: Self-Actualization Theory", theorist: "Carl Rogers", approach: "Humanistic", pages: [271, 290] },
  { number: 11, title: "George Kelly: Personal Construct Theory", theorist: "George Kelly", approach: "Cognitive", pages: [293, 314] },
  { number: 12, title: "B. F. Skinner: Reinforcement Theory", theorist: "B. F. Skinner", approach: "Behavioral", pages: [317, 338] },
  { number: 13, title: "Albert Bandura: Modeling Theory", theorist: "Albert Bandura", approach: "Social-learning", pages: [341, 368] },
  { number: 14, title: "Facets of Personality: Rotter, Zuckerman, Seligman", theorist: "Rotter, Zuckerman, Seligman", approach: "Limited-domain", pages: [371, 406] },
  { number: 15, title: "Personality in Perspective", theorist: null, approach: "Synthesis", pages: [407, 417] },
];
