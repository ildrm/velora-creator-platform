import { describe, expect, it } from "vitest";
import { canProceed, type ComplianceState } from "./entitlements";

const verified: ComplianceState = { ageAssurance: "verified", creatorIdentity: "verified", performerRecordsComplete: true, moderationVerdict: "pass", payoutMethodVerified: true };

describe("compliance gates", () => {
  it("blocks restricted viewing until age assurance passes", () => expect(canProceed("view_restricted_content", { ...verified, ageAssurance: "pending" })).toEqual({ allowed: false, reason: "age_assurance_required" }));
  it("blocks publishing before performer records are complete", () => expect(canProceed("publish", { ...verified, performerRecordsComplete: false }).allowed).toBe(false));
  it("blocks publishing when media is quarantined", () => expect(canProceed("publish", { ...verified, moderationVerdict: "quarantine" })).toEqual({ allowed: false, reason: "moderation_pass_required" }));
  it("allows payout only after every required gate", () => expect(canProceed("payout", verified)).toEqual({ allowed: true }));
});
