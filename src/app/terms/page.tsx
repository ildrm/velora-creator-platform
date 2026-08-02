import { DocumentPage } from "@/components/document-page";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return <DocumentPage eyebrow="Prototype terms" title="A safe demonstration, not a live service." summary="These prototype terms describe the repository's present boundaries and are not production consumer terms." updated="August 2, 2026" sections={[
    { title: "Permitted use", paragraphs: ["Use the prototype for product evaluation, design review, engineering development, and synthetic testing. Do not enter real identity, financial, confidential, illegal, or restricted media data."] },
    { title: "No transactions", paragraphs: ["Prices, balances, memberships, unlocks, and payouts are illustrative. No purchase, subscription, entitlement, or payout is created by interacting with the demo."] },
    { title: "Production requirements", items: ["Approved consumer and creator terms.", "Content and acceptable-use policies.", "Refund, cancellation, complaint, and appeal procedures.", "Jurisdiction-specific disclosures and records statements.", "Processor, vendor, and operational readiness."] }
  ]} />;
}
