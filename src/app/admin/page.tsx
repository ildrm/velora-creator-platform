import { KeyRound, ScrollText, Settings2, ShieldCheck, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const metadata = { title: "Administration" };

export default function AdminPage() {
  return <AppShell compact><header className="page-heading"><div><p className="eyebrow">Administration</p><h1>People, policy, and control.</h1><p>Administrator-only access for role assignment and system governance.</p></div><KeyRound size={26}/></header><section className="admin-grid"><article><span className="metric-icon coral"><UsersRound/></span><h2>Users and roles</h2><p>Review account state and grant least-privilege roles.</p><strong>4 demo identities</strong></article><article><span className="metric-icon sage"><ShieldCheck/></span><h2>Access policy</h2><p>Inspect the permission matrix applied to protected routes.</p><strong>16 permissions</strong></article><article><span className="metric-icon violet"><Settings2/></span><h2>Policy versions</h2><p>Manage versioned platform and compliance configuration.</p><strong>Demo policy v1</strong></article><article><span className="metric-icon amber"><ScrollText/></span><h2>Audit trail</h2><p>Review authentication, authorization, and privileged actions.</p><strong>Append-only target</strong></article></section></AppShell>;
}
