import { subjects } from "@/content";
import View from "./View";

export default function Page() {
  return <View subjects={subjects.map((x) => ({ id: x.id, short: x.short, paper: x.paper, count: x.chapters.length }))} />;
}
