import Link from "next/link";
import { ArrowLeft, ShieldX } from "lucide-react";

export default async function UnauthorizedPage({ searchParams }: { searchParams: Promise<{ required?: string }> }) {
  const { required } = await searchParams;
  return <main className="access-page"><section><span><ShieldX size={27}/></span><p className="eyebrow">Access denied</p><h1>This workspace needs another role.</h1><p>Your session is valid, but this account does not have permission to open the requested area{required ? ` (${required.replaceAll(",", " or ")})` : ""}.</p><Link href="/" className="button button-dark"><ArrowLeft size={15}/>Return home</Link></section></main>;
}
