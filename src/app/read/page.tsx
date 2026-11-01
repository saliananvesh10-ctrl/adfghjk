"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/progress";
import { parseUid } from "@/content/types";

// "Study reader" in the nav: jump back to the last place read, or start at the beginning.
export default function ReadIndex() {
  const s = useProgress();
  const router = useRouter();
  useEffect(() => {
    if (!s.last) { router.replace("/read/personality/1"); return; }
    const { s: sid, n } = parseUid(s.last.ch);
    router.replace(`/read/${sid}/${n}${s.last.sectionId ? `#${s.last.sectionId}` : ""}`);
  }, [s.last, router]);
  return <p className="muted">Opening the reader…</p>;
}
