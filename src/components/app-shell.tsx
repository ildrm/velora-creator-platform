"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bookmark,
  Compass,
  Home,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { creators, topics } from "@/lib/data";
import { Avatar } from "./avatar";
import { useAuth } from "./auth-provider";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/vault", label: "Saved", icon: Bookmark },
];

export function AppShell({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const auth = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <Link href="/" className="brand" aria-label="Velora home">
            <span className="brand-mark"><Sparkles size={17} strokeWidth={2.4} /></span>
            <span>velora</span>
          </Link>
          <div className="top-search">
            <Search size={17} />
            <input aria-label="Search creators and topics" placeholder="Search creators, stories, topics" />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            {auth.loading ? <span className="auth-loading" /> : auth.authenticated && auth.user ? <>
              {auth.can("creator:manage") && <Link href="/studio" className="studio-link">Creator studio</Link>}
              {auth.can("moderation:review") && <Link href="/moderation" className="studio-link">Moderation</Link>}
              {auth.can("role:manage") && <Link href="/admin" className="studio-link">Admin</Link>}
              <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19}/><span className="notification-dot"/></button>
              <Link href="/profile" className="mini-profile" aria-label={`${auth.user.name} profile`} title={`${auth.user.name} · ${auth.user.role}`}>{auth.user.initials}</Link>
            </> : <Link href="/login" className="button button-dark button-small"><LogIn size={14}/>Sign in</Link>}
          </div>
        </div>
      </header>

      <div className={`shell-grid ${compact ? "shell-grid-compact" : ""}`}>
        <aside className="left-rail">
          <nav className="side-nav" aria-label="Primary navigation">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={active ? "active" : ""}>
                  <Icon size={19} strokeWidth={active ? 2.3 : 1.8} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          {!auth.loading && (!auth.authenticated || auth.can("content:purchase")) && <div className="rail-card verification-card">
            <span className="rail-card-icon"><ShieldCheck size={18} /></span>
            <p className="eyebrow">One step left</p>
            <strong>Verify to unlock the full experience</strong>
            <p>Private, one-time age assurance. Velora never stores your ID.</p>
            <Link href="/verify" className="button button-dark button-small">Verify now</Link>
          </div>}
          <div className="rail-footer">
            <span>© 2026 Velora</span>
            <Link href="/safety">Safety</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </aside>

        <main className="main-content">{children}</main>

        {!compact && (
          <aside className="right-rail">
            <section className="right-section">
              <div className="section-heading-row">
                <h2>Creators to know</h2>
                <Link href="/discover">See all</Link>
              </div>
              <div className="creator-mini-list">
                {creators.slice(3, 6).map((creator) => (
                  <Link href={`/creator/${creator.handle}`} className="creator-mini" key={creator.id}>
                    <Avatar creator={creator} size="sm" />
                    <span className="creator-mini-copy">
                      <strong>{creator.name}</strong>
                      <span>{creator.category}</span>
                    </span>
                    <span className="follow-pill">Follow</span>
                  </Link>
                ))}
              </div>
            </section>
            <section className="right-section topic-section">
              <div className="section-heading-row"><h2>Trending now</h2></div>
              <div className="topic-list">
                {topics.map((topic, index) => (
                  <Link href={`/discover?topic=${encodeURIComponent(topic)}`} key={topic}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{topic}</strong>
                    <span>{["2.4K", "1.8K", "1.5K", "962", "744"][index]} posts</span>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        )}
      </div>

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return <Link key={href} href={href} className={active ? "active" : ""}><Icon size={20} /><span>{label}</span></Link>;
        })}
      </nav>

      {mobileMenu && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenu(false)}>
          <aside className="mobile-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <span className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>velora</span></span>
              <button className="icon-button" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={20} /></button>
            </div>
            <nav className="side-nav">
              {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileMenu(false)}><Icon size={19} />{label}</Link>)}
              {!auth.authenticated && <Link href="/login" onClick={() => setMobileMenu(false)}><LogIn size={19}/>Sign in</Link>}
              {auth.can("creator:manage") && <Link href="/studio" onClick={() => setMobileMenu(false)}><UserRound size={19}/>Creator studio</Link>}
              {auth.can("moderation:review") && <Link href="/moderation" onClick={() => setMobileMenu(false)}><ShieldCheck size={19}/>Moderation</Link>}
              {auth.can("role:manage") && <Link href="/admin" onClick={() => setMobileMenu(false)}><ShieldCheck size={19}/>Administration</Link>}
              {auth.authenticated && <button className="drawer-logout" onClick={() => void auth.logout()}><LogOut size={19}/>Sign out</button>}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
