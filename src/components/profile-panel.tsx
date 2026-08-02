"use client";

import Link from "next/link";
import { CreditCard, KeyRound, LogOut, Settings2, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "./auth-provider";

const roleDescriptions = { fan: "Fan account", creator: "Creator account", moderator: "Trust & safety account", admin: "Administrator account" } as const;

export function ProfilePanel() {
  const auth = useAuth();
  if (auth.loading || !auth.user) return <div className="account-loading">Loading your account…</div>;
  const user = auth.user;
  return <><header className="page-heading"><div><p className="eyebrow">Your account</p><h1>Profile and permissions.</h1><p>Review your authenticated identity, role, and available workspaces.</p></div><span className="profile-page-avatar">{user.initials}</span></header><section className="account-summary"><div><span className="metric-icon coral"><UserRound size={19}/></span><strong>{user.name}</strong><small>{roleDescriptions[user.role]} · {user.email}</small></div><button onClick={() => void auth.logout()} className="button button-outline"><LogOut size={15}/>Sign out</button></section><section className="permission-summary"><p className="eyebrow">Granted permissions</p><div>{auth.permissions.map((permission) => <span key={permission}>{permission}</span>)}</div></section><section className="settings-list"><Link href="/verify"><span className="setting-icon"><ShieldCheck size={18}/></span><span><strong>Identity and age assurance</strong><small>Purpose-limited verification status</small></span><em>Demo</em></Link>{auth.can("creator:manage") && <Link href="/studio"><span className="setting-icon"><Settings2 size={18}/></span><span><strong>Creator studio</strong><small>Publishing, analytics, and payout readiness</small></span><em>Allowed</em></Link>}{auth.can("moderation:review") && <Link href="/moderation"><span className="setting-icon"><ShieldCheck size={18}/></span><span><strong>Moderation workspace</strong><small>Content decisions, reports, and safety cases</small></span><em>Allowed</em></Link>}{auth.can("role:manage") && <Link href="/admin"><span className="setting-icon"><KeyRound size={18}/></span><span><strong>Administration</strong><small>Users, roles, policy, and audit</small></span><em>Allowed</em></Link>}<button><span className="setting-icon"><CreditCard size={18}/></span><span><strong>Payments and memberships</strong><small>No payment method is stored in safe-demo mode</small></span><em>Empty</em></button></section></>;
}
