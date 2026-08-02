"use client";

import Link from "next/link";
import { Bookmark, Heart, LockKeyhole, MessageCircle, MoreHorizontal, Play, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/lib/data";
import { Avatar } from "./avatar";
import { useAuth } from "./auth-provider";

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [unlocked, setUnlocked] = useState(!post.locked);
  const auth = useAuth();

  function require(permission: "content:purchase" | "profile:update", action: () => void) {
    if (!auth.authenticated) { window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`); return; }
    if (!auth.can(permission)) { window.location.assign("/unauthorized"); return; }
    action();
  }

  return (
    <article className="post-card">
      <header className="post-header">
        <Link href={`/creator/${post.creator.handle}`} className="post-author">
          <Avatar creator={post.creator} />
          <span>
            <strong>{post.creator.name} {post.creator.verified && <ShieldCheck className="verified-icon" size={14} fill="currentColor" />}</strong>
            <small>@{post.creator.handle} · {post.postedAt}</small>
          </span>
        </Link>
        <button className="icon-button" aria-label="More post options"><MoreHorizontal size={20} /></button>
      </header>
      <p className="post-caption">{post.caption}</p>
      <div className={`post-media ${post.locked && !unlocked ? "media-locked" : ""}`} style={{ background: post.gradient }}>
        <span className="media-noise" />
        <div className="media-art" aria-hidden="true"><span /><span /><span /></div>
        {post.locked && !unlocked ? (
          <div className="lock-panel">
            <span className="lock-icon"><LockKeyhole size={21} /></span>
            <strong>Made for members</strong>
            <p>Unlock this post and keep it in your library.</p>
            <button onClick={() => require("content:purchase", () => setUnlocked(true))} className="button button-light">Unlock for ${post.price}</button>
            <small>Secure checkout · one-time purchase</small>
          </div>
        ) : (
          <button className="play-button" aria-label="Play media"><Play size={21} fill="currentColor" /></button>
        )}
        <span className="media-label">{unlocked ? post.mediaLabel : "Preview"}</span>
      </div>
      <footer className="post-footer">
        <div className="post-actions">
          <button className={liked ? "liked" : ""} onClick={() => setLiked(!liked)} aria-label={liked ? "Unlike" : "Like"}>
            <Heart size={19} fill={liked ? "currentColor" : "none"} />
            <span>{(post.likes + (liked ? 1 : 0)).toLocaleString()}</span>
          </button>
          <button aria-label="Comment"><MessageCircle size={19} /><span>{post.comments}</span></button>
        </div>
        <button className={saved ? "saved" : ""} onClick={() => require("profile:update", () => setSaved(!saved))} aria-label={saved ? "Remove bookmark" : "Bookmark"}>
          <Bookmark size={19} fill={saved ? "currentColor" : "none"} />
        </button>
      </footer>
    </article>
  );
}
