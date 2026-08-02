import { DocumentPage } from "@/components/document-page";

export const metadata = { title: "Safety" };

export default function SafetyPage() {
  return <DocumentPage eyebrow="Trust center" title="Safety is part of the product." summary="Velora is designed around verified participation, pre-publication review, clear reporting, and human accountability." updated="August 2, 2026" sections={[
    { title: "How the demo works", paragraphs: ["This repository uses synthetic profiles, abstract media, and simulated verification states. It does not collect identity documents, payment-card data, or restricted user content."] },
    { title: "Production safety commitments", items: ["Age and identity assurance through approved hosted providers.", "Quarantined uploads and pre-publication safety decisions.", "Report and block controls on content, profiles, and messages.", "Segregated evidence handling and jurisdiction-specific reporting playbooks.", "Versioned decisions, appeals, access controls, and immutable audit trails."] },
    { title: "Get help", paragraphs: ["The production service will provide urgent-safety and ordinary-support channels with published response targets. Those operational channels are intentionally not simulated in this prototype."] }
  ]} />;
}
