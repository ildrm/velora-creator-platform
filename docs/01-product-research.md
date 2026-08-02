# Velora Creator Platform — Product Research

Status: decision-ready research snapshot  
Audience: product, design, engineering, risk, and operations  
Research date: August 2, 2026

## Executive Summary

**Build a trust-led creator membership product, not a visual clone of OnlyFans.** The strongest entrant position is a polished, mobile-first space where creators can earn through memberships and one-time releases, fans can discover people inside the product, and both sides can understand exactly what is paid, private, and verified.

**The addressable behavior is proven, but the economics are unforgiving.** Fenix International's FY2024 filing reports about $7.22B in gross fan payments, $1.41B of platform revenue, 4.63M creator accounts, and 377.46M fan accounts. Account totals are not active-user or unique-person measures, and the filing does not establish what a typical creator earns. The useful conclusion is category scale—not a promise of creator outcomes.

**Trust and payment operations determine viability.** Viewer age assurance, creator/performer verification, notice-and-action, CSAM reporting, consent evidence, payment-network registration, disputes, reserves, and auditable ledgers are product surfaces and launch gates. No UI can compensate for missing underwriting, vendor contracts, jurisdictional analysis, or operational response teams.

**The recommended MVP wedge is discovery + creator operations.** Fansly validates built-in discovery; Patreon now promotes discovery, video, community, and one-time purchases at a standard 10% platform fee for new creators. Velora should combine transparent discovery with creator-facing retention, payout, and safety tooling rather than compete only on take rate.

## 1. Decision and Scope

This research supports four decisions:

1. What product should be built first?
2. Which features create differentiation rather than parity?
3. Which legal, payments, and trust dependencies block launch?
4. How should the implementation be phased without pretending external integrations are complete?

The product category is a creator subscription and paywalled-content marketplace. The implementation is content-neutral, but the architecture assumes that an operator may permit restricted adult content in some jurisdictions. That assumption expands—not relaxes—the required safety and compliance controls.

## 2. Source Document Review

The two supplied documents are valuable discovery briefs, but they should not be treated as final requirements without correction.

| Source claim | Assessment | Decision taken |
|---|---|---|
| Fenix FY2024 category scale and 80/20 model | Directionally supported by the public filing | Use as evidence of category scale; do not infer active users or typical creator income |
| Ofcom fined Fenix “$1.4M” for an age threshold error | Incorrect amount and incomplete cause | Correct to £1.05M; the finding concerned inaccurate responses to statutory requests, not a finding that children accessed content |
| Every UGC platform automatically has §2257 producer duties | Overstated legal conclusion | Build performer-record capability, preserve provenance, and require counsel to determine operator duties by workflow and jurisdiction |
| Positive CSAM match should never reach storage and needs no review | Operationally unsafe wording | Prevent publication and general storage; quarantine in a segregated evidence store with tightly controlled reporting/preservation procedures |
| Standard Stripe/Adyen is unsuitable by default | Correct as a planning assumption for restricted adult content | Use a processor adapter and require explicit acquirer underwriting; never hardcode a generic processor as launch-ready |
| MongoDB is required for feed and messaging | Architecture preference, not a requirement | Start with fewer data systems; add specialist stores only after scale evidence |
| Microservices are mandatory for MVP | Premature for a new team | Use a modular monolith/BFF for product discovery and production-shaped service boundaries; extract money, identity, and moderation services first |

## 3. Market and Competitive Evidence

### Category scale

Fenix International's Companies House filing for the year ended November 30, 2024 is the strongest public category benchmark. Reported figures include:

- Gross fan payments: approximately $7.22B, up 9% year over year.
- Platform revenue: approximately $1.41B.
- Creator accounts: 4.63M, up 13%.
- Fan accounts: 377.46M, up 24%.

These are account and payment-flow figures. They do not reveal monthly active fans, paid-member retention, creator income distribution, or acquisition efficiency. Those missing denominators matter more to Velora's operating plan than headline registrations.

### Competitive position

| Product | Core model | Discovery | Differentiating strength | Strategic lesson |
|---|---|---|---|---|
| OnlyFans | 20% platform share across fan payments | Historically external-audience led | Category liquidity and direct monetization | Scale validates demand, but does not make a clone defensible |
| Fansly | Subscription and unlock model | Native For You Page | Internal recommendation and free previews | Discovery is a real user need and an entrant wedge |
| Patreon | Memberships, one-time products, video, live, community | Creator-first discovery | Broad creator categories and mature community tools | Membership is becoming a full creator operating system |
| Substack | Paid writing, audio, video, network effects | Recommendations and app network | Publishing workflow and owned audience | Distribution and audience portability build creator trust |

Patreon's July 2026 fee documentation states that creators publishing after August 4, 2025 use a standard 10% platform plan, excluding payment, currency, payout, tax, and—in some channels—app-store fees. Price comparison must therefore use total creator cost and risk allocation, not platform fee alone.

### Market conclusion

Velora should not lead with “cheaper.” A credible offer is:

> A calm, discovery-led membership platform where fans understand the value before paying and creators understand audience, safety, disputes, and payout timing after they earn.

## 4. Customer Problems

### Fan jobs to be done

- Help me find creators worth supporting without leaving the platform.
- Show enough context and safe preview value before I pay.
- Make price, renewal, unlock, and cancellation terms obvious.
- Keep identity and payment details private.
- Give me one-tap report, block, refund-request, and support routes.
- Keep my purchased library organized and available across devices.

### Creator jobs to be done

- Turn an existing audience into dependable recurring income.
- Reach new people without becoming a full-time growth marketer.
- Publish quickly while understanding why content is pending or blocked.
- See membership retention, product mix, disputes, reserve, and payout timing.
- Control pricing, previews, availability, and audience communication.
- Protect content, identity, consent evidence, and account access.

### Operations jobs to be done

- Prove that every launch-critical control is configured and monitored.
- Triage reports with severity, jurisdiction, evidence, and deadlines.
- Reconcile processor events, ledger entries, reserves, refunds, disputes, and payouts.
- Preserve lawful evidence while minimizing access and retention.
- Demonstrate policy and configuration changes to regulators, acquirers, and auditors.

## 5. Recommended Product Strategy

### North star

Use **monthly retained paying relationships**: the number of fan–creator membership relationships that are active at month end and were also active or newly acquired in the prior month, excluding fraud, refunded transactions, internal accounts, and complimentary access.

This avoids celebrating empty registrations and ties product quality to durable creator income.

### Driver metrics

- Discovery preview → creator profile rate.
- Profile → follow rate.
- Verified visitor → first paid relationship conversion.
- Month-one paid-member retention.
- Paid relationships per active creator.
- Gross payment success and recovery rate.
- Creator payout timeliness after reserve eligibility.
- Report acknowledgment and resolution SLA by severity.
- Verification completion rate and median completion time by method/jurisdiction.

### Guardrails

- Confirmed underage-access incidents.
- Reportable safety incident rate and reporting timeliness.
- Fraud/dispute ratios against acquirer/card-network thresholds.
- Unauthorized media-access rate.
- False-positive moderation appeal rate.
- Support contacts per 1,000 paid relationships.
- Creator revenue concentration and median creator outcome.

## 6. Feature Research and Priority

### MVP: must be coherent on day one

| Capability | Fan value | Creator value | Launch condition |
|---|---|---|---|
| Public discovery and safe previews | Find relevant creators | Organic reach | Content eligibility policy and indexing rules approved |
| Account and session security | Safe return experience | Protects earnings | MFA/passkeys for money-moving roles; recovery flow tested |
| Viewer age assurance | Lawful access where required | Trust signal | Vendor, policy, geography, fallback, deletion, and audit configuration approved |
| Creator/performer verification | Safer marketplace | Monetization eligibility | Vendor plus consent/provenance workflow approved |
| Memberships | Simple recurring value | Predictable income | Underwritten processor, hosted payment page, ledger, refunds, disputes, tax responsibilities |
| Posts and collections | Valuable feed/library | Sustainable publishing | Pre-publication moderation and signed delivery |
| Creator dashboard | Clear business state | Retention and planning | Source metrics defined and reconciled |
| Report/block/support | Fast recourse | Healthier community | Staffed operations, severity SLAs, escalation paths |

### Next: high-value expansion

- One-time paid releases with explicit, durable entitlement records.
- Direct messages after abuse controls, rate limits, and report workflows are mature.
- Tips using processor-compliant minimums and clear refunds/dispute behavior.
- Search and recommendation explanations (“because you follow…”).
- Creator audience export where policy and privacy allow.
- Reserve and dispute evidence workspace.

### Later: expensive or high-risk

- Live streaming: real-time moderation, recording policy, latency, safety staffing, and payout abuse make this a separate program.
- Multi-DRM: valuable for deterrence, but signed delivery and watermarking may be a better early cost/benefit choice.
- Native mobile apps: app-store policies, payment rules, content restrictions, and review processes need a separate product decision.
- Wallets and stored value: may create additional money-transmission and safeguarding obligations.

## 7. UX Principles

1. **Value before obstruction.** Let unverified visitors see safe public context; place a clear, contextual gate at restricted viewing or payment.
2. **Truthful locks.** Never transmit an unauthorized full asset and hide it with CSS. Return only a generated preview until entitlement succeeds.
3. **Explain every wait.** Pending moderation, reserve, dispute, and verification states need plain-language cause, owner, and expected next step.
4. **Private by default.** Verification UI must state what Velora receives and what remains with the provider.
5. **One primary action.** Feed, profile, paywall, verification, and dashboard cards each need a single dominant next action.
6. **Mobile without compromise.** Reach, contrast, focus order, reduced motion, narrow-layout comprehension, and intermittent network behavior are acceptance criteria.
7. **No dark patterns.** Renewal, one-time pricing, total cost, cancellation, refund policy, and data use are visible before confirmation.

## 8. Trust, Legal, and Payment Findings

### Age assurance

The European Commission published a privacy-oriented age-verification blueprint in July 2025 and a user-facing app update in April 2026. Ofcom's March 2025 enforcement against Fenix demonstrates that configuration governance and accurate regulator reporting matter in addition to choosing a vendor. Store a signed result, method, policy version, jurisdiction, and timestamp; do not store the source document or selfie in Velora systems.

### U.S. performer records

18 U.S.C. §2257 requires covered producers to create and maintain identifiable performer records and place a records-location statement on covered material. The definition of “produces” and hosting/distribution exclusions are workflow-sensitive. Velora must support records and provenance, but counsel must decide which entity is the producer for each content workflow and what retention/access rules apply.

### CSAM reporting and evidence

18 U.S.C. §2258A requires U.S.-based electronic service providers to report apparent violations they become aware of. NCMEC reports 21.3M CyberTipline reports in 2025, predominantly from service providers. Product requirements are: block publication, freeze risky capabilities, preserve minimum necessary evidence in a segregated store, restrict access, prevent user notification when prohibited, and route through an approved reporting playbook. Vendor classification never replaces trained review and legal/operations procedures.

### Payments

Visa's public April 2026 rules identify adult-content services under MCC 5967 and require applicable Integrity Risk Program controls. Mastercard likewise places explicit monitoring and unlawful-content-control duties on acquirers supporting non-face-to-face adult-content merchants. Processor selection is therefore an underwriting program, not an SDK choice.

PCI SSC guidance states that SAQ A eligibility requires all payment-page elements to originate directly from PCI-compliant providers; an iframe can qualify only when every card-data capture element remains inside it and all other criteria are met. Velora must never accept PAN/CVV in its own component or API.

## 9. Business Model Recommendation

Recommended starting hypothesis:

- 12–15% platform fee for mainstream permitted categories.
- A separately underwritten restricted-content program only after true processor and operations costs are known.
- Processing, currency, tax, and payout costs shown separately and transparently.
- No “all-in 20%” promise until reserve losses, dispute operations, verification, moderation, insurance, and support are modeled.

Pricing tests should compare creator net revenue and paid-member retention, not conversion alone.

## 10. Risks and Unknowns

- Target launch jurisdictions and permitted content policy are not yet approved.
- No vendor contracts, processing underwriting, card-network registration, or NCMEC registration are represented by the demo.
- Fenix account totals do not provide reliable active-user or typical-earnings benchmarks.
- Live moderation cost and staffing model are unknown.
- Creator acquisition channel and initial supply strategy are not defined.
- Tax, merchant-of-record, payout, reserve, and money-transmission responsibility requires entity-specific advice.

## 11. Recommended Next Steps

1. Choose launch jurisdiction, entity, permitted-content policy, and initial creator category.
2. Obtain written payment underwriting and total economics before publishing a take-rate promise.
3. Run vendor proof-of-concepts for age assurance, creator verification, and media safety using synthetic test packs.
4. Recruit 10–20 design partners and validate discovery, profile, price comprehension, dashboard, and moderation-state UX.
5. Complete threat modeling, DPIA/privacy review, incident drills, and operational staffing before a closed paid beta.
6. Instrument the north-star, funnel, retention, dispute, payout, and safety guardrails before acquisition spend.

## Sources

- [Fenix International filing history, Companies House](https://find-and-update.company-information.service.gov.uk/company/10354575/filing-history)
- [Ofcom: Fenix/OnlyFans £1.05M penalty, March 27, 2025](https://www.ofcom.org.uk/online-safety/protecting-children/ofcom-fines-provider-of-onlyfans-1.05-million)
- [European Commission age-verification blueprint, July 14, 2025](https://commission.europa.eu/news-and-media/news/minimising-risks-children-and-young-people-face-online-2025-07-14_en)
- [NCMEC CyberTipline 2025 data](https://www.ncmec.org/gethelpnow/cybertipline/cybertiplinedata)
- [18 U.S.C. §2257, U.S. House](https://uscode.house.gov/view.xhtml?edition=prelim&hl=false&req=granuleid%3AUSC-prelim-title18-section2257)
- [PCI SSC: payment page and iframe eligibility](https://www.pcisecuritystandards.org/faqs/1438/)
- [Visa Core Rules, April 2026](https://by.visa.com/content/dam/VCOM/download/about-visa/visa-rules-public.pdf)
- [Mastercard Security Rules and Procedures, 2026](https://www.mastercard.com/content/dam/mccom/shared/business/support/rules-pdfs/SPME-Manual.pdf)
- [Patreon creator fees overview, July 2026](https://support.patreon.com/hc/en-us/articles/11111747095181-Creator-fees-overview)
- [Fansly For You Page help](https://help.fansly.com/en/articles/12836984-for-you-page-fyp)

This report is product and engineering research, not legal advice. Applicable duties depend on entity, jurisdiction, content policy, data flows, and negotiated processor/vendor terms.
