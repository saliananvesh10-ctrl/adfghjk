import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Personality Study",
  description: "Theories of Personality (Schultz & Schultz, 11th ed.) — reader, lab, tutor, practice and revision.",
};

// Applies the saved theme before paint so there is no flash.
const themeInit = `try{var t=localStorage.getItem('tp-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <div className="shell">
          <Nav />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
