import { pick } from "@/lib/pick";
import View from "./View";

export default async function Page({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { subj, tabs, meta } = await pick(searchParams);
  return <View subject={meta} tabs={tabs} chapters={subj.chapters.map(({ uid, number, title, pages, summary, terms, sections }) => ({ uid, number, title, pages, summary, terms, sections: sections.map(({ id, heading }) => ({ id, heading })) }))} />;
}
