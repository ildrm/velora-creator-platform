import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, CalendarDays, Check, ChevronRight, CircleDollarSign, Clock3, Eye, FileCheck2, MessageCircle, Plus, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const activity = [
  { title: "New monthly member", meta: "@mira joined Studio Circle", time: "8 min", icon: UsersRound },
  { title: "Post unlocked", meta: "Glaze archive · $7.00", time: "31 min", icon: Eye },
  { title: "Member message", meta: "“The process notes are beautiful…”", time: "1 hr", icon: MessageCircle },
];

export default function StudioPage() {
  return (
    <AppShell compact>
      <header className="studio-header">
        <div><p className="eyebrow">Creator studio</p><h1>Your work is finding its people.</h1><p>Sunday, August 2 · Updated moments ago</p></div>
        <div><button className="button button-outline"><CalendarDays size={15} />Last 30 days</button><button className="button button-primary"><Plus size={15} />Create</button></div>
      </header>
      <section className="launch-readiness">
        <span className="readiness-icon"><ShieldCheck size={22} /></span>
        <div><p className="eyebrow">Launch readiness · 4 of 5</p><strong>One check remains before payouts can begin.</strong><p>Your identity and content-safety gates are active. Add a verified payout method to complete setup.</p></div>
        <Link href="/verify" className="button button-dark">Finish setup <ChevronRight size={14} /></Link>
      </section>
      <section className="metric-grid">
        <article><span className="metric-icon coral"><CircleDollarSign size={19} /></span><p>Net earnings</p><strong>$6,482</strong><small className="positive"><ArrowUpRight size={13} />12.8% <em>vs last month</em></small></article>
        <article><span className="metric-icon sage"><UsersRound size={19} /></span><p>Active members</p><strong>1,284</strong><small className="positive"><ArrowUpRight size={13} />8.4% <em>vs last month</em></small></article>
        <article><span className="metric-icon violet"><Eye size={19} /></span><p>Post views</p><strong>42.9K</strong><small className="positive"><ArrowUpRight size={13} />19.2% <em>vs last month</em></small></article>
        <article><span className="metric-icon amber"><Clock3 size={19} /></span><p>Member retention</p><strong>91.6%</strong><small className="negative"><ArrowDownRight size={13} />1.1% <em>vs last month</em></small></article>
      </section>
      <section className="studio-grid">
        <article className="studio-card earnings-card">
          <div className="studio-card-head"><div><p className="eyebrow">Earnings</p><h2>Steady growth, led by memberships</h2></div><button>View report <ChevronRight size={13} /></button></div>
          <div className="chart-wrap"><div className="chart-y"><span>$8k</span><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><div className="chart-area"><i className="grid-line l1" /><i className="grid-line l2" /><i className="grid-line l3" /><i className="grid-line l4" /><svg viewBox="0 0 520 190" role="img" aria-label="Earnings increased from roughly $3,000 to $6,500 over six months"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f25f42" stopOpacity=".28"/><stop offset="1" stopColor="#f25f42" stopOpacity="0"/></linearGradient></defs><path d="M0 160 C55 145,65 120,112 127 S180 100,220 108 S294 82,337 85 S410 50,455 62 S500 33,520 25 L520 190 L0 190Z" fill="url(#fill)"/><path d="M0 160 C55 145,65 120,112 127 S180 100,220 108 S294 82,337 85 S410 50,455 62 S500 33,520 25" fill="none" stroke="#e75b3f" strokeWidth="3" strokeLinecap="round"/><circle cx="520" cy="25" r="5" fill="#fff" stroke="#e75b3f" strokeWidth="3"/></svg><div className="chart-x"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div></div></div>
          <div className="earnings-legend"><span><i className="legend-dot coral" /><strong>Memberships</strong><small>$4,820 · 74%</small></span><span><i className="legend-dot sage" /><strong>Unlocks</strong><small>$1,162 · 18%</small></span><span><i className="legend-dot violet" /><strong>Tips</strong><small>$500 · 8%</small></span></div>
        </article>
        <article className="studio-card activity-card"><div className="studio-card-head"><div><p className="eyebrow">Live pulse</p><h2>Recent activity</h2></div></div><div className="activity-list">{activity.map(({title,meta,time,icon:Icon}) => <div className="activity-item" key={title}><span><Icon size={16} /></span><div><strong>{title}</strong><small>{meta}</small></div><time>{time}</time></div>)}</div><button className="button button-soft button-wide">View all activity</button></article>
        <article className="studio-card content-card"><div className="studio-card-head"><div><p className="eyebrow">Content health</p><h2>Ready to publish</h2></div><Sparkles size={18} /></div><div className="content-health"><span><FileCheck2 size={18}/><span><strong>All 3 recent uploads passed</strong><small>Automated screening and required records complete</small></span></span><span className="health-badge"><Check size={12}/>Healthy</span></div></article>
        <article className="studio-card next-payout"><div><p className="eyebrow">Next payout</p><h2>$2,140.80</h2><p>Estimated August 8 after the reserve window.</p></div><span className="payout-ring"><strong>72%</strong><small>cleared</small></span></article>
      </section>
    </AppShell>
  );
}
