import { subjects, meta } from "@/content";
import { lite } from "@/lib/slices";
import View from "./View";

export default function Page() {
  return <View groups={subjects.map((s) => ({ meta: meta(s), chapters: s.chapters.map(lite) }))} />;
}
