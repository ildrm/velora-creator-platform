import { Bookmark, Play } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { posts } from "@/lib/data";

export default function VaultPage() {
  return <AppShell><header className="page-heading"><div><p className="eyebrow">Your library</p><h1>Saved for later.</h1><p>Posts and releases you bookmarked or unlocked.</p></div><Bookmark size={24} /></header><div className="library-grid">{posts.map((post) => <article className="library-card" key={post.id}><div style={{background:post.gradient}}><span className="media-noise" /><button><Play size={16} fill="currentColor" /></button></div><span><small>{post.creator.name}</small><strong>{post.mediaLabel}</strong><p>{post.locked ? "Unlocked collection" : "Saved post"}</p></span></article>)}</div></AppShell>;
}
