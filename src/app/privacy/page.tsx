import { DocumentPage } from "@/components/document-page";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <DocumentPage eyebrow="Privacy overview" title="Collect less. Explain more." summary="This prototype demonstrates Velora's privacy direction; it is not a final jurisdiction-specific privacy notice." updated="August 2, 2026" sections={[
    { title: "Data minimization", paragraphs: ["Velora's application services must never receive raw payment-card details, identity documents, selfies, or biometric templates. Certified hosted providers should return purpose-limited references and assurance results."] },
    { title: "What this demo stores", items: ["Only synthetic demo identities are defined; no real profile information is collected.", "A signed, HTTP-only session cookie lasts up to eight hours or until sign-out.", "No identity, payment, message, or media data is persisted.", "No analytics, advertising pixels, or third-party fonts are loaded."] },
    { title: "Before production", paragraphs: ["The operating entity must publish a complete notice covering purposes, legal bases, processors, international transfers, retention, deletion, rights, reporting duties, and contact routes before processing real user data."] }
  ]} />;
}
