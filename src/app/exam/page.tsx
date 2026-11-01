import { pick } from "@/lib/pick";
import View from "./View";

export default async function Page({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { subj, tabs, meta } = await pick(searchParams);
  return <View subject={meta} tabs={tabs} chapters={subj.chapters.map(({ uid, number, title, theorist, practice }) => ({ uid, number, title, theorist, practice }))} />;
}
