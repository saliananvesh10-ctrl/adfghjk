import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, getSubject, meta } from "@/content";
import Reader from "./Reader";

export const generateStaticParams = () => subjects.flatMap((s) => s.chapters.map((c) => ({ s: s.id, ch: String(c.number) })));

export default async function Page({ params }: { params: Promise<{ s: string; ch: string }> }) {
  const { s, ch } = await params;
  const subj = getSubject(s);
  const c = subj?.chapters.find((x) => x.number === Number(ch));
  if (!subj) notFound();
  if (!c) {
    // In the book's outline but not written yet: say so instead of a 404.
    const o = subj.outline.find((x) => x.number === Number(ch));
    if (!o) notFound();
    return (
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="eyebrow">{subj.short} · Chapter {o.number} · pp. {o.pages[0]}–{o.pages[1]}</div>
        <h1 style={{ margin: "6px 0 10px" }}>{o.title}</h1>
        <p className="muted">This chapter hasn&apos;t been written yet. The Source library shows what&apos;s done and what&apos;s pending.</p>
        <div className="row" style={{ marginTop: 12 }}><Link className="btn primary" href="/sources">Source library</Link><Link className="btn" href="/subjects">All chapters</Link></div>
      </div>
    );
  }
  const nums = subj.chapters.map((x) => x.number), i = nums.indexOf(c.number);
  return <Reader c={c} subject={meta(subj)} prev={nums[i - 1] ?? null} next={nums[i + 1] ?? null} />;
}
