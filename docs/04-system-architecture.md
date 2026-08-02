# System Architecture

## Architecture decision

Start as a modular product application with explicit service contracts. Extract identity, moderation, payment, and ledger workloads first because they have distinct security, scaling, audit, and failure boundaries. Avoid operating Kafka, MongoDB, OpenSearch, ClickHouse, and ten deployable services before product-market evidence justifies them.

```text
Browser / PWA
    |
Edge gateway: TLS, WAF, rate policy, request IDs
    |
Web application / BFF -------------------------+
    |             |             |              |
Identity      Content       Commerce        Discovery
adapter       workflow      orchestration   read model
    |             |             |              |
IDV vendor    quarantine    processor       search index
                  |             |
             moderation     ledger + payout
               adapters        |
                  |        append-only entries
             evidence/reporting
```

## Runtime boundaries

### Web application

- Next.js App Router, TypeScript, server-rendered/static public pages, client components only for interaction.
- Owns page composition and a backend-for-frontend contract.
- Does not own identity artifacts, card data, media originals, or financial truth.

### Identity service

- Creates vendor sessions and consumes signature-verified callbacks.
- Stores minimal assertions and policy versions.
- Supplies purpose-limited eligibility decisions, not raw vendor payloads.
- Separate encryption keys and privileged access path.

### Content workflow

- Issues constrained upload credentials to a quarantine bucket/keyspace.
- Maintains content state machine and performer/provenance references.
- Generates safe previews only after allowed processing.
- Issues protected delivery tokens after server-side entitlement checks.

### Moderation and reporting

- Orchestrates malware, known-hash, classifier, policy, and human review.
- Uses versioned decision records and outbox events.
- Separates ordinary review storage from reportable-evidence storage.
- Owns appeal and reporting workflow, not recommendation ranking.

### Payment orchestration

- Presents a processor-neutral intent model.
- Never accepts PAN/CVV; creates hosted checkout sessions.
- Verifies webhooks, deduplicates provider events, and publishes normalized payment events.
- Routing is policy-driven by entity, jurisdiction, currency, method, content category, health, and contract—not round-robin.

### Ledger and payout

- Double-entry, append-only ledger in PostgreSQL.
- Transaction, posting batch, and entry are immutable; corrections are reversing/adjusting batches.
- Balances are derived/cached views, never authoritative mutable totals.
- Payout eligibility accounts for settlement, refund/dispute exposure, reserve policy, tax/identity, sanctions, and negative balance.

### Discovery

- Builds an eligibility-filtered read model from public profile/content events.
- Starts with PostgreSQL full-text/trigram or a small search service.
- OpenSearch is introduced only when query/scale/relevance needs justify operational cost.

## Content state machine

```text
draft
  -> upload_authorized
  -> quarantined
  -> scanning
      -> needs_review -> scanning/pass|quarantine
      -> quarantine -> evidence_hold/reporting/appeal
      -> pass
  -> processing
  -> ready
  -> scheduled|published
  -> withdrawn|expired
```

No transition to `ready`, `scheduled`, or `published` is valid without the current required provenance and moderation gates. Every transition uses an optimistic version or row lock and an idempotency key.

## Payment state machine

```text
created -> requires_action -> processing -> succeeded
                                 |            |
                                 v            v
                              failed      refunded/partially_refunded
                                              |
                                              v
                                         disputed -> won|lost
```

Browser redirects are advisory. Provider webhooks are authoritative after signature, replay-window, account, amount, currency, and intent validation.

## Eventing pattern

- Use a PostgreSQL transactional outbox before introducing a broker.
- Consumers record `(consumer, event_id)` before side effects.
- Events carry identifiers and decision metadata, not raw identity documents, media, or card data.
- Publish schemas with backward-compatible versioning.
- Use dead-letter queues only with a replay/runbook owner; a dead letter is not a resolution.

Core events:

- `identity.assurance.updated.v1`
- `content.upload.completed.v1`
- `moderation.verdict.recorded.v1`
- `content.published.v1`
- `payment.status.changed.v1`
- `ledger.batch.posted.v1`
- `dispute.status.changed.v1`
- `payout.status.changed.v1`
- `account.capability.changed.v1`

## Media delivery

1. Client requests upload intent.
2. API checks creator capability, content type/size, quota, and provenance preconditions.
3. Client uploads directly to quarantine storage with a single-object, short-TTL credential.
4. Scanner reads from quarantine; the public CDN cannot.
5. Passing content is transcoded and a distinct low-information preview is generated.
6. Viewer API rechecks content eligibility and entitlement, then returns a short-lived audience-bound token.
7. CDN/origin validates token; keys are not predictable and bucket listing is disabled.

Signed URLs deter casual sharing but are not DRM. Add user-specific forensic watermarking before expensive multi-DRM unless device/content requirements prove otherwise.

## Deployment topology

### Prototype

- Single Next.js container.
- Synthetic data and safe-demo adapters.
- No external identity, restricted media, payment, or payout data.

### Closed beta

- Managed PostgreSQL with PITR and separate identity/ledger schemas or databases.
- Private object storage buckets for quarantine, evidence, originals, renditions, and previews.
- Worker deployments for callbacks, scanning, transcode, outbox, and reconciliation.
- Secrets manager, WAF, central logs/metrics/traces, queue, and on-call.

### Scale triggers

- Extract service when it needs an independent security boundary, availability target, team ownership, deployment cadence, or materially different scaling profile.
- Add search engine when PostgreSQL relevance/latency targets fail under representative load.
- Add event broker when outbox consumers or cross-region/event volume exceed the database pattern—not because microservices diagrams expect Kafka.

## Resilience

- Identity/moderation/processor outage: fail closed for affected restricted actions.
- Discovery outage: fall back to cached editorial results.
- Notification outage: do not roll back the business event; queue delivery.
- Ledger unavailable: accept no new finalized money state; safely retain verified provider events for replay.
- CDN/origin issue: avoid issuing long-lived bypass URLs.
- Every dependency has timeout, retry budget, circuit-break behavior, and observable degradation state.

## Performance budget

- Public JS initial budget: ≤170KB gzip target for common feed/profile route.
- Server/edge response target: ≤400ms p75 for cached public reads; ≤800ms p75 for authenticated metadata reads.
- Responsive preview images use AVIF/WebP where supported and explicit dimensions.
- Lazy-load below-fold media; prefetch only high-intent links.
- Database list endpoints use cursor pagination and bounded projections.
- Creator analytics read from pre-aggregated, reconciliation-aware tables, never unbounded ledger scans.

## Architecture decision records

### ADR-001 — Modular monolith first

Accepted. Product learning and operational simplicity outweigh independent scaling at launch. High-risk boundaries remain interface-separated.

### ADR-002 — PostgreSQL is the default system of record

Accepted. Identity assertions, content metadata, relationships, entitlements, cases, and money benefit from transactions and constraints. Specialist stores require evidence.

### ADR-003 — Transactional outbox before Kafka

Accepted. Preserves atomic domain/event changes without immediate broker operations. Revisit at measured volume/ownership thresholds.

### ADR-004 — Hosted vendor surfaces for identity and card capture

Accepted. Reduces toxic-data handling and PCI/biometric exposure. UX customizability is secondary to scope and control.

### ADR-005 — Quarantine, do not simply delete safety evidence

Accepted. Publication is blocked immediately; minimum evidence handling follows approved reporting/preservation playbooks with segregated access.
