# Data Model

## Core relational entities

### Account and identity

- `users(id, email_normalized, role, status, created_at, deleted_at)`
- `sessions(id, user_id, token_hash, assurance_level, expires_at, revoked_at)`
- `assurance_assertions(id, user_id, purpose, provider, provider_ref, result, method, policy_version, jurisdiction, verified_at, expires_at)`
- `creator_profiles(user_id, handle, display_name, bio, eligibility_status, created_at)`
- `performers(id, creator_id, identity_record_ref, status, created_at)`
- `content_performers(content_id, performer_id, consent_record_ref, verified_at)`

Raw documents/selfies/biometrics are not columns and are not accepted as JSON blobs.

### Content and social

- `content(id, creator_id, kind, title, body, visibility, price_minor, currency, state, policy_version, version, created_at, published_at)`
- `media_assets(id, content_id, role, storage_ref, mime, bytes, width, height, duration_ms, checksum, state)`
- `moderation_decisions(id, content_id, verdict, reason_code, source, source_version, reviewer_id, created_at)`
- `follows(fan_id, creator_id, created_at)`
- `memberships(id, fan_id, creator_id, offer_id, status, current_period_start, current_period_end)`
- `entitlements(id, fan_id, scope_type, scope_id, source_type, source_id, starts_at, expires_at, revoked_at)`
- `messages(id, conversation_id, sender_id, body_ciphertext, content_id, created_at, deleted_at)`

### Commerce and ledger

- `payment_intents(id, user_id, purpose, amount_minor, currency, processor, processor_ref, status, idempotency_key, created_at)`
- `processor_events(id, processor, event_id, payload_ref, received_at, processed_at, status)`
- `ledger_accounts(id, owner_type, owner_id, code, currency, status)`
- `posting_batches(id, business_event_type, business_event_id, status, posted_at)`
- `ledger_entries(id, batch_id, account_id, direction, amount_minor, currency, created_at)`
- `reserves(id, creator_id, source_batch_id, amount_minor, eligible_at, released_batch_id)`
- `disputes(id, payment_intent_id, processor_ref, amount_minor, status, evidence_due_at)`
- `payouts(id, creator_id, amount_minor, currency, destination_ref, status, requested_at, completed_at)`

Constraint: each posted batch balances debits and credits per currency. No update/delete permission exists for posted entries.

### Safety and audit

- `reports(id, reporter_id, subject_type, subject_id, category, severity, status, jurisdiction, created_at)`
- `cases(id, report_id, owner_id, playbook_version, legal_hold, status, due_at)`
- `case_evidence(id, case_id, evidence_ref, classification, created_at)`
- `audit_events(id, actor_type, actor_id, action, resource_type, resource_id, reason_code, policy_version, request_id, created_at)`
- `outbox_events(id, aggregate_type, aggregate_id, event_type, version, payload, created_at, published_at)`

## Key constraints and indexes

- Unique normalized email and case-insensitive creator handle.
- Unique `(processor, event_id)` and `payment_intents.idempotency_key`.
- Unique consumer-event receipt for each asynchronous consumer.
- Partial indexes for active memberships, publishable content, open cases, unreleased reserves, and unprocessed events.
- Cursor indexes include stable tie-breaker IDs.
- Foreign-key deletion defaults to restrict for financial, identity, moderation, and audit references.

## Retention

Retention is a policy table keyed by data class, jurisdiction, purpose, state, legal hold, and contract. Never scatter retention periods in application constants. Background deletion emits proof events and is tested against restores/backups.
