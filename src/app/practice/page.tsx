import { pick } from "@/lib/pick";
import View from "./View";

export default async function Page({ searchParams }: { searchParams: Promise<{ s?: string; ch?: string }> }) {
  const { subj, tabs, meta } = await pick(searchParams);
  const ch = Number((await searchParams).ch) || null;
  return <View subject={meta} tabs={tabs} start={ch} chapters={subj.chapters.map(({ uid, number, title, assessment, checks }) => ({ uid, number, title, assessment, checks }))} />;
}
