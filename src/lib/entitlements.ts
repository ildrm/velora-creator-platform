export type Gate = "view_restricted_content" | "monetize" | "publish" | "payout";
export type AssuranceState = "missing" | "pending" | "verified" | "failed" | "expired";

export type ComplianceState = {
  ageAssurance: AssuranceState;
  creatorIdentity: AssuranceState;
  performerRecordsComplete: boolean;
  moderationVerdict: "not_submitted" | "pending" | "pass" | "quarantine";
  payoutMethodVerified: boolean;
};

export function canProceed(gate: Gate, state: ComplianceState): { allowed: boolean; reason?: string } {
  if (state.ageAssurance !== "verified") return { allowed: false, reason: "age_assurance_required" };
  if (gate === "view_restricted_content") return { allowed: true };
  if (state.creatorIdentity !== "verified") return { allowed: false, reason: "creator_identity_required" };
  if (gate === "monetize") return { allowed: true };
  if (gate === "publish" && !state.performerRecordsComplete) return { allowed: false, reason: "performer_records_required" };
  if (gate === "publish" && state.moderationVerdict !== "pass") return { allowed: false, reason: "moderation_pass_required" };
  if (gate === "payout" && !state.payoutMethodVerified) return { allowed: false, reason: "payout_method_required" };
  return { allowed: true };
}
