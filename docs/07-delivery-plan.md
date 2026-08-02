# Delivery Plan and Backlog

## Phase 0 — Decisions and controls (4–8 weeks)

- Entity, jurisdiction, content policy, terms/privacy, producer/records analysis.
- Processor/acquirer underwriting and network-registration plan.
- Identity, age assurance, safety, storage, email, and observability vendor selection.
- Threat model, DPIA, data inventory, incident and reporting playbooks.
- Design partner recruitment and prototype research.

Exit: written decisions, contracts/proof-of-concepts, named operational owners, no unresolved launch-critical control.

## Phase 1 — Closed synthetic prototype (implemented baseline)

- Responsive feed, discovery, creator, messaging, library, studio, and verification journeys.
- Safe-demo provider boundary.
- Server-visible entitlement policy and compliance health API.
- Static generation for public routes.
- Product, scenario, architecture, data, security, and API documents.

Exit: production build/type/lint/unit checks pass; usability research can run without sensitive or payment data.

## Phase 2 — Production foundation (6–10 weeks)

- Accounts, passkeys/MFA, session and recovery controls.
- PostgreSQL migrations, audit log, transactional outbox.
- Hosted identity and age-assurance adapter with webhook tests.
- Quarantine upload, preview, moderation adapter, case workflow.
- Hosted payment checkout, normalized webhooks, double-entry ledger, reconciliation.
- Report/block/support, staff access, observability, backup/restore.

Exit: security review, synthetic vendor test suites, ledger invariants, incident drills, operational runbooks.

## Phase 3 — Closed paid beta (two renewal cycles minimum)

- Memberships, entitlements, refunds, disputes, reserve and manual payout.
- Creator offer/content tools and source-defined dashboard.
- Discovery eligibility and editorial/relevance ranking.
- Support/safety staffing and service-level measurement.
- 10–20 design partner creators and invite-only fans.

Exit: retention, payment, safety, support, payout, and reliability guardrails remain within approved ranges.

## Phase 4 — Expansion

- One-time paid releases and limited messaging.
- Automated payout after reconciliation maturity.
- Recommendation experimentation with explanation and safety controls.
- Audience portability and creator business tools.
- Live streaming only as a separately staffed/risk-reviewed program.

## Initial backlog

### P0

- Identity callback raw-body signature verification and replay tests.
- Content state machine with immutable decision history.
- Separate preview/original object policies.
- Double-entry posting library with property tests.
- Processor webhook inbox and daily reconciliation.
- Report/block on every content and message surface.
- Privileged-console MFA and case-bound access.
- Metrics dictionary and analytics event privacy review.

### P1

- Creator offer configuration and preview simulator.
- Follow graph and discovery eligibility read model.
- Membership lifecycle/dunning and cancellation.
- Creator content-health and payout-readiness drilldown.
- Moderation appeal and user-status messaging.
- Exportable finance statements.

### P2

- One-time releases, bundles, promotional pricing.
- Messaging request controls and creator inbox tooling.
- Personalized discovery with reason codes.
- Forensic watermarking.
- Multi-currency display after processor/accounting approval.

## Test strategy

- Unit: entitlement policy, state machines, calculation and redaction.
- Property: balanced ledger, idempotent event replay, monotonic capabilities.
- Contract: vendor callbacks, payment events, storage policies, event schemas.
- Integration: upload→quarantine→decision→preview→entitlement→delivery.
- End-to-end: fan, creator, report, dispute, payout, recovery, deletion.
- Non-functional: load, dependency failure, queue backlog, restore, accessibility, mobile performance.
- Production: synthetic probes only; never seed unsafe media or identity documents into general environments.
