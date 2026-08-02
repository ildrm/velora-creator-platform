# Security, Privacy, and Compliance Baseline

This is an engineering control baseline, not a legal determination or certification.

## Data classes

| Class | Examples | Rule |
|---|---|---|
| Prohibited in Velora | PAN, CVV, raw ID/selfie, biometric template | Reject, never log or persist; use hosted vendor surface |
| Restricted identity | assurance reference, legal identity result, tax/payout status | Separate encryption/access, purpose limitation, audit |
| Restricted safety | reports, evidence, hash/classifier result, legal hold | Segregated store, case-based access, immutable audit |
| Restricted financial | processor references, ledger, disputes, payout | Append-only audit, reconciliation, least privilege |
| Private product | messages, purchases, membership state | Encryption, purpose-limited internal access |
| Public | approved profile and preview metadata | Eligibility checked before indexing/caching |

## Threat model

| Threat | Example | Primary controls |
|---|---|---|
| Underage access | location/method bypass, shared account | jurisdiction policy, robust assurance, re-check triggers, device/session risk, governance |
| Unauthorized media | guessed keys, CSS-hidden originals, leaked URLs | separate preview assets, entitlement check, signed audience-bound TTL, private origin |
| Account takeover | credential stuffing, SIM swap, recovery abuse | passkeys/MFA, rate/risk controls, session inventory, recovery holds |
| Payment abuse | card testing, friendly fraud, webhook forgery | hosted page, velocity/device controls, 3DS policy, signatures, idempotency, reconciliation |
| Ledger corruption | duplicate webhook, race, manual edit | unique provider IDs, balanced immutable batches, serializable/locked posting, replay tests |
| Malicious upload | malware, disallowed content, polyglot file | allowlist, magic-byte inspection, sandboxed processing, quarantine, scanning |
| Insider abuse | browsing identity/safety evidence | case-bound access, just-in-time privilege, dual control, alerting, immutable audit |
| Vendor compromise | callback spoof, data overcollection | signed callbacks, egress allowlist, contracts, data maps, kill switch, reconciliation |
| Privacy leakage | logs/analytics capture sensitive fields | schema allowlists, redaction, payload testing, short retention, access review |
| Availability/extortion | upload flood, dependency failure | WAF, quotas, backpressure, circuit breakers, runbooks, backups, recovery tests |

## Mandatory controls

### Authentication and authorization

- Passkeys preferred; MFA mandatory for creators and privileged users.
- Short sessions for privileged consoles; step-up for payout, email, password, MFA, and policy changes.
- RBAC plus resource/case attributes; support access does not imply evidence or ledger access.
- Deny-by-default service identity and scoped workload credentials.

### Application

- CSRF protection for cookie-authenticated mutations, strict origin checks, CSP, HSTS, frame policy, secure cookies.
- Input and output schemas at every boundary.
- Upload type determined by content inspection, not extension or client MIME.
- SSRF protection for vendor/media fetchers with egress allowlists and private-address blocking.
- Dependency lockfile, reproducible build, SBOM, image signing/provenance, and CI vulnerability policy.

### Webhooks

- Verify signature against raw body, timestamp tolerance, expected account, event type, amount/currency, and known intent.
- Unique `(provider, event_id)` constraint.
- Acknowledge only after durable receipt; process asynchronously and replay safely.
- Reconcile provider exports/API against internal payment and ledger state daily.

### Audit

- Record actor/workload, action, resource, before/after decision state, reason, request/correlation ID, policy/version, and timestamp.
- Never place prohibited or full evidence payloads in general audit logs.
- Store critical audit streams in write-once/append-only destination with access alerts.

## Privacy engineering

- Maintain data inventory, purpose, legal basis, processors, location, retention, and deletion behavior.
- Complete a DPIA before identity/biometric-related assurance or large-scale restricted-content processing.
- Use provider-hosted age/identity capture and configure deletion/minimization contractually and technically.
- Separate consent evidence, identity evidence, and content; retrieve only for an authorized case.
- Deletion workflows honor statutory/contractual retention and legal holds and explain exceptions accurately.

## Safety operations

- Automated signals never mean “no human or process required.”
- Known-hash matches block publication and enter a restricted case playbook.
- Novel-content models use calibrated thresholds, version capture, quality monitoring, and review.
- Urgent queues have 24/7 coverage before a public restricted-content launch.
- Reporter safety, non-retaliation, appeal, law-enforcement request, emergency disclosure, and evidence-preservation procedures are tested.

## Compliance decision register

The following require named counsel/owner approval before paid beta:

- Entity and merchant-of-record structure.
- Launch countries/states and geolocation standard.
- Permitted/restricted/prohibited content policy.
- Age-assurance method by jurisdiction and fallback.
- Performer-record responsibility and statement placement.
- CSAM and other mandatory-reporting registrations/playbooks.
- Payment network/acquirer registration, descriptors, dispute/reserve terms.
- Tax collection/remittance and creator reporting.
- Payout/KYC/sanctions responsibility.
- Data location, transfers, retention, deletion, and law-enforcement response.

## Security release evidence

- Threat model and data-flow review.
- SAST, dependency, secret, IaC, container, and DAST results.
- Independent penetration test and remediation.
- Access and key rotation review.
- Backup restore and ledger reconciliation exercise.
- Vendor outage and signature-failure drills.
- Safety escalation/tabletop exercise.
- Documented residual risk acceptance.
