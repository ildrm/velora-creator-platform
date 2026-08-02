"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import type { Role } from "@/lib/auth";

const demoLoginOptions = [
  { email: "fan@velora.demo", password: "FanDemo!2026", role: "fan" },
  { email: "creator@velora.demo", password: "CreatorDemo!2026", role: "creator" },
  { email: "moderator@velora.demo", password: "ModeratorDemo!2026", role: "moderator" },
  { email: "admin@velora.demo", password: "AdminDemo!2026", role: "admin" },
] satisfies ReadonlyArray<{ email: string; password: string; role: Role }>;

const roleCopy: Record<Role, string> = {
  fan: "Follow, purchase, save, and message",
  creator: "Publish, analyze, and receive payouts",
  moderator: "Review content, reports, and account safety",
  admin: "Manage users, roles, policy, and audit",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ email, password }) });
    if (!response.ok) { setBusy(false); setError("The email or password is incorrect."); return; }
    const requested = searchParams.get("next");
    const safeTarget = requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/";
    window.location.assign(safeTarget);
  }

  function choose(role: Role) {
    const user = demoLoginOptions.find((item) => item.role === role)!;
    setEmail(user.email); setPassword(user.password); setError("");
  }

  return <main className="login-page"><div className="login-top"><Link href="/" className="brand"><span className="brand-mark"><Sparkles size={17}/></span><span>velora</span></Link><Link href="/" className="document-back"><ArrowLeft size={15}/>Continue browsing</Link></div><section className="login-layout"><div className="login-story"><p className="eyebrow">Welcome back</p><h1>Your circle is<br/>waiting for you.</h1><p>Sign in to access your saved work, conversations, creator tools, or operations workspace.</p><div className="login-trust"><span><ShieldCheck size={17}/><span><strong>Role-based access</strong><small>Every protected route is checked on the server.</small></span></span><span><LockKeyhole size={17}/><span><strong>HTTP-only session</strong><small>The signed session is unavailable to browser scripts.</small></span></span></div></div><div className="login-card"><div><p className="eyebrow">Safe-demo access</p><h2>Sign in to Velora</h2><p>Choose a role to fill its demo credentials, then sign in.</p></div><div className="role-picker">{demoLoginOptions.map((user) => <button type="button" key={user.role} className={email === user.email ? "active" : ""} onClick={() => choose(user.role)}><span><UserRound size={15}/></span><strong>{user.role}</strong><small>{roleCopy[user.role]}</small>{email === user.email && <Check size={13}/>}</button>)}</div><form onSubmit={submit}><label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="username" required placeholder="you@example.com"/></label><label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required placeholder="Your password"/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary button-wide" disabled={busy}>{busy ? "Signing in…" : <>Sign in <ArrowRight size={15}/></>}</button></form><small className="demo-warning">Synthetic accounts only. Never reuse these credentials in production.</small></div></section></main>;
}

export default function LoginPage() { return <Suspense fallback={<main className="login-page"><div className="login-loading">Loading secure sign-in…</div></main>}><LoginForm/></Suspense>; }
