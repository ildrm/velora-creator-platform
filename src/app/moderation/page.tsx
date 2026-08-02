import { AlertTriangle, CheckCircle2, Clock3, FileWarning, ShieldCheck, UserX } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const metadata = { title: "Moderation" };

export default function ModerationPage() {
  return <AppShell compact><header className="page-heading"><div><p className="eyebrow">Trust & safety</p><h1>Moderation workspace.</h1><p>Role restricted to moderators and administrators.</p></div><ShieldCheck size={26}/></header><section className="ops-metrics"><article><Clock3/><span><strong>7</strong><small>Awaiting review</small></span></article><article><AlertTriangle/><span><strong>2</strong><small>Urgent cases</small></span></article><article><CheckCircle2/><span><strong>94%</strong><small>Within SLA</small></span></article></section><section className="ops-table"><header><div><p className="eyebrow">Synthetic queue</p><h2>Priority cases</h2></div><span>Safe demo</span></header><div className="ops-row"><span className="setting-icon"><FileWarning size={17}/></span><span><strong>Content provenance review</strong><small>CASE-1042 · policy match requires human decision</small></span><em className="priority-high">High</em></div><div className="ops-row"><span className="setting-icon"><UserX size={17}/></span><span><strong>Account behavior report</strong><small>CASE-1041 · 3 related reports</small></span><em>Standard</em></div></section></AppShell>;
}
