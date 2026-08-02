"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth } from "./auth-provider";

export function HomeIntro() {
  const { loading, user } = useAuth();
  const firstName = user?.name.split(" ")[0];
  return <section className="feed-intro"><div><p className="eyebrow">Sunday, August 2</p><h1>{loading ? "Welcome to Velora." : firstName ? `Good afternoon, ${firstName}.` : "Find work worth following."}</h1><p>{user ? "A quieter feed, shaped by the people you chose." : "Discover creators freely. Sign in only when you want to save, message, or support."}</p></div><Link href="/discover" className="button button-soft"><Sparkles size={16}/>Explore creators</Link></section>;
}
