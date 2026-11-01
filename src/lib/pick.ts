import { subjects, getSubject, meta } from "@/content";

// For pages that show one textbook at a time (?s=<subject id>). Defaults to the first subject with content.
export async function pick(searchParams: Promise<{ s?: string }>) {
  const { s } = await searchParams;
  const subj = getSubject(s) ?? subjects.find((x) => x.chapters.length) ?? subjects[0];
  const tabs = subjects.map((x) => ({ id: x.id, short: x.short, paper: x.paper, count: x.chapters.length }));
  return { subj, tabs, meta: meta(subj) };
}
