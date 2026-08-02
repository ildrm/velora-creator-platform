import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export type DocumentSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function DocumentPage({ eyebrow, title, summary, updated, sections }: {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  sections: DocumentSection[];
}) {
  return (
    <main className="document-page">
      <header className="document-topbar">
        <Link href="/" className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>velora</span></Link>
        <Link href="/" className="document-back"><ArrowLeft size={15} />Back to the app</Link>
      </header>
      <article className="document-sheet">
        <div className="document-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{summary}</p><small>Last updated {updated}</small></div>
        <div className="document-sections">
          {sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
        </div>
      </article>
    </main>
  );
}
