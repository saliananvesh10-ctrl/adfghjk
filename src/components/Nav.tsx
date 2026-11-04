"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const groups: [string, [string, string][]][] = [
  ["Study", [["/", "Dashboard"], ["/subjects", "Subjects"], ["/read", "Study reader"], ["/lab", "Psychology lab"], ["/explore", "Interactive studio"], ["/coverage", "Syllabus coverage"], ["/tutor", "AI tutor"]]],
  ["Test yourself", [["/practice", "Practice & quizzes"], ["/flashcards", "Flashcards"], ["/exam", "Exam preparation"], ["/past-papers", "Past-paper preparation"], ["/revision", "Revision"]]],
  ["Track", [["/progress", "Progress"], ["/sources", "Source library"]]],
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => setTheme(document.documentElement.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")), []);

  const cycle = () => {
    const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const cur = theme ?? (sysDark ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("tp-theme", next); } catch { /* ignore */ }
    setTheme(next);
  };
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <div className="topbar">
        <button className="btn ghost" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 600 }}>Psychology Study</span>
        <button className="btn ghost" onClick={cycle} aria-label="Toggle theme"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" /></svg></button>
      </div>
      <aside className="side" data-open={open}>
        <div className="brand">Psychology Study<small>PG theory papers · textbook-grounded</small></div>
        <nav className="nav">
          {groups.map(([g, links]) => (
            <div key={g}>
              <div className="grp">{g}</div>
              {links.map(([href, label]) => (
                <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}>{label}</Link>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ padding: "18px 10px 0" }} className="row">
          <button className="btn" onClick={cycle}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" /></svg> {theme === "dark" ? "Light" : "Dark"} theme</button>
          {open && <button className="btn ghost" onClick={() => setOpen(false)}>Close</button>}
        </div>
      </aside>
    </>
  );
}
