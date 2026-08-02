# Velora Product Requirements Document

Version: 0.1  
Status: MVP baseline

## Product statement

Velora is a mobile-first creator membership platform that helps fans discover and directly support creators while giving creators transparent control over content, relationships, safety, and earnings.

## Personas

- Fan: discovers creators, follows free previews, joins memberships, buys releases, saves content, messages permitted creators, and manages payments.
- Creator: verifies identity, configures an offer, uploads content, manages members, understands earnings and disputes, and receives payouts.
- Trust & safety analyst: reviews reports and vendor signals, records decisions, preserves evidence, and escalates reportable events.
- Finance operator: reconciles processor activity, ledger entries, reserves, refunds, disputes, and payouts.
- Compliance administrator: controls policy versions, jurisdiction rules, vendor configuration, access, retention, and audit evidence.

## MVP goals

- Validate that internal discovery produces qualified creator-profile visits.
- Validate clear membership value and pricing comprehension.
- Give creators a credible dashboard for members, earnings, content health, and payout readiness.
- Enforce restricted viewing, monetization, publication, and payout gates in code.
- Keep external vendors behind explicit adapters and safe-demo behavior.

## Non-goals

- Live streaming.
- Native mobile apps.
- Stored-value wallets or creator lending.
- An autonomous moderation model.
- Production identity, CSAM, payment, payout, email, or object-storage credentials.
- Claims of compliance certification.

## Functional requirements

### Accounts and security

- FR-A1: users can create a fan or creator account.
- FR-A2: sessions use secure, HTTP-only cookies; money-moving accounts require MFA/passkeys.
- FR-A3: account recovery invalidates prior sessions and generates an audit event.
- FR-A4: permission checks are server-side and deny by default.

### Discovery and profiles

- FR-D1: unauthenticated or unverified visitors may access approved public profiles and safe previews.
- FR-D2: discovery supports topic filters and relevance-ranked creator results.
- FR-D3: ranking excludes blocked, ineligible, pending, or policy-restricted content.
- FR-D4: recommendations record reason codes for explanation and audit.

### Identity and age assurance

- FR-I1: restricted viewing and payment require a current age-assurance assertion where policy demands it.
- FR-I2: monetization requires creator identity verification.
- FR-I3: Velora stores only provider reference, assurance result, method, jurisdiction/policy version, and timestamps.
- FR-I4: raw document, selfie, biometric template, PAN, or CVV must be rejected from application logs and persistence.
- FR-I5: webhook results are signature-verified and idempotent.

### Content

- FR-C1: creators request an upload slot after authentication and eligibility checks.
- FR-C2: uploads remain in quarantine until malware, safety, consent/provenance, and policy gates pass.
- FR-C3: public and paid previews are separately generated assets; the protected original is never sent before entitlement.
- FR-C4: publication requires performer records where applicable and a moderation `pass` verdict.
- FR-C5: every decision records policy/model/vendor version and human override metadata.

### Memberships and purchases

- FR-M1: checkout uses processor-hosted pages or fully isolated hosted fields.
- FR-M2: prices, recurrence, taxes/fees, cancellation, and refund terms appear before confirmation.
- FR-M3: processor webhooks, not browser redirects, finalize payment state.
- FR-M4: every financial mutation is idempotent and creates balanced ledger entries.
- FR-M5: entitlements reference the immutable purchase/membership event and content scope.

### Creator studio

- FR-S1: creators see net earnings, active members, retention, post views, revenue mix, and metric definitions.
- FR-S2: readiness shows identity, payout, content-safety, and policy blockers.
- FR-S3: payout estimates show reserve eligibility and are labeled estimates until processor settlement.
- FR-S4: disputes show evidence deadlines, status, amount, and impact without exposing prohibited fan data.

### Reports and moderation

- FR-T1: report and block are reachable from every creator, post, message, and purchase context.
- FR-T2: severity, reporter safety, jurisdiction, deadline, and legal-hold flags drive routing.
- FR-T3: suspected CSAM is blocked from publication and placed in segregated, access-controlled evidence storage.
- FR-T4: reportable incidents follow jurisdiction-specific playbooks and preserve immutable audit trails.

## Non-functional requirements

- NFR-P1: LCP target ≤2.5s at p75 on representative mobile networks for cached public pages.
- NFR-P2: INP target ≤200ms at p75; CLS ≤0.1.
- NFR-P3: public discovery and profile pages are statically generated or edge-cached where policy permits.
- NFR-P4: media uses generated previews, responsive formats, explicit dimensions, and signed short-TTL delivery.
- NFR-R1: payment and ledger webhooks are at-least-once safe and recoverable by replay.
- NFR-R2: financial RPO is zero for committed ledger entries; initial RTO target is 60 minutes.
- NFR-S1: secrets never ship to browser bundles or repositories.
- NFR-S2: privileged access requires MFA, least privilege, and auditable approvals.
- NFR-S3: logs use allowlisted structured fields and automatic sensitive-value redaction.
- NFR-A1: WCAG 2.2 AA is the baseline; all critical flows work by keyboard and at 200% zoom.
- NFR-O1: every gate emits decision, latency, dependency, and failure metrics without raw identity or media.

## MVP acceptance criteria

- Feed, discovery, profile, verification, messaging, library, and studio routes render at desktop and mobile widths.
- An unverified state is blocked by the entitlement policy for restricted content.
- Publishing fails unless performer records are complete and moderation state is `pass`.
- Payout fails unless identity, age, and payout method states pass.
- Production build, typecheck, lint, and compliance unit tests pass.
- Safe-demo mode clearly labels simulated vendor handoffs.
- No remote fonts, scripts, tracking pixels, identity data, or payment-card fields are included.

## Release gates

### Closed prototype

- Synthetic data only.
- No real restricted content, identity documents, cards, or payouts.
- UX research consent and deletion process.

### Closed paid beta

- Counsel-approved entity, jurisdictions, policy, terms, and privacy notices.
- Signed vendor DPAs/contracts and verified webhook/callback controls.
- Processor/acquirer underwriting and required network registration.
- Reconciled double-entry ledger and dispute/payout runbooks.
- Staffed safety operations, reporting registration, incident drills, and legal-hold workflow.
- Pen test, threat model, access review, DPIA, backup/restore exercise, and on-call.

### Public launch

- Beta guardrails within approved thresholds for at least two renewal cycles.
- Capacity, dependency-failure, queue-backlog, and recovery tests pass.
- Support and safety SLAs achieved with headroom.
- Board/executive risk acceptance for documented residual risks.
