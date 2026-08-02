# User Scenarios and Acceptance Tests

## S1 — Discover and follow a creator

Given a visitor can access the safe public surface, when they filter discovery by topic and open a creator, then they see the creator's value proposition, safe previews, price, recurrence, and follow action without encountering restricted media.

Failure states: creator becomes ineligible while cached; recommendation service is unavailable; preview is missing.  
Acceptance: eligibility is rechecked at read time, results degrade to a neutral list, and no protected original URL is present in HTML or network payloads.

## S2 — Verify age at the point of need

Given an unverified fan opens restricted content or checkout, when the gate appears, then it explains why verification is required, what the provider collects, what Velora stores, alternatives/fallback, and expected time.

When the provider returns a signed pass, Velora stores only the approved assertion fields and resumes the original intent.  
When the result is pending, failed, expired, or unverifiable, access remains blocked and a safe support route is offered.

## S3 — Join a creator membership

Given an eligible fan and creator, when the fan chooses a membership, then checkout shows amount, currency, billing period, taxes/fees where known, renewal date, cancellation, and refund terms before the processor-hosted payment step.

When the browser returns before the webhook, UI shows `payment pending`; only a signature-verified, idempotent processor event activates the membership and ledger entries.

## S4 — Unlock a one-time release

Given an eligible fan sees a locked release, when they purchase it, then the payment event creates a durable entitlement and only then can the API issue a short-lived signed media token.

Refreshing, copying a preview URL, changing a client flag, or guessing an asset key must not expose the original.

## S5 — Creator onboarding

Given a new creator, when they start monetization setup, then they complete account security, creator identity, tax/payout requirements, policy training, and content/performer provenance configuration.

The studio readiness view names each blocker and never marks the creator launch-ready based only on client state.

## S6 — Upload and publish

Given an eligible creator requests an upload, the system creates an isolated quarantine object and emits a scan job. Malware, known-hash, classifier, provenance, and policy decisions run before publishing.

Pass: transcode/preview generation proceeds and the creator may schedule or publish.  
Needs review: content remains unavailable and the creator sees a neutral pending state.  
Quarantine/reportable: publication and relevant account capabilities are blocked; evidence and reporting playbooks apply.

## S7 — Creator sees earnings and payout timing

Given settled and pending transactions, when a creator opens Studio, then metrics distinguish gross fan payments, refunds, disputes, platform fees, processing, reserve, available balance, and paid amount.

Every total reconciles to ledger entries and has a definition. Estimates are visibly labeled and never presented as withdrawable funds.

## S8 — Fan reports a post or message

Given a fan encounters harmful content or conduct, when they report it, then they may block immediately, choose an accessible reason, add context without mandatory exposure, and receive a reference.

Urgent safety categories bypass normal queues. The reported user is not given reporter identity. Evidence access and user notification follow the applicable playbook.

## S9 — Creator disputes a moderation decision

Given content is blocked but an appeal is allowed, when the creator appeals, then the case shows the policy category, permitted evidence, expected review window, and status.

The appeal is reviewed by an authorized person who did not make the original manual decision when staffing permits; changes record reason and policy version.

## S10 — Payment dispute and reserve

Given a transaction is disputed, when a processor webhook arrives, then the event is deduplicated, a ledger hold/reversal is posted, the creator dashboard updates, and the evidence deadline is queued.

A negative creator balance cannot be silently hidden or “fixed” by editing prior entries; adjustments are new balanced entries.

## S11 — Dependency outage

Given identity, moderation, processor, storage, or event infrastructure is unavailable, then the product fails closed for the affected restricted action while safe public reading can continue where allowed.

UI shows a retry-safe state. Background jobs use bounded retries, dead-letter handling, and operator alerts. No user is told to resubmit payment or identity data if an idempotent job may still complete.

## S12 — Account deletion

Given a valid deletion request, the system identifies deletable data, legally retained data, active disputes, evidence/legal holds, processor obligations, and creator/fan relationship effects.

The user receives an accurate outcome rather than a blanket “everything deleted” message. Data is removed from active systems and aged out of backups according to the approved schedule.
