import { describe, expect, it } from "vitest";
import { createSessionToken, hasPermission, permissionsFor, safeUser, verifySessionToken, demoUsers } from "./auth";

describe("role permissions", () => {
  it("keeps fan capabilities within fan features", () => { expect(hasPermission("fan", "content:purchase")).toBe(true); expect(hasPermission("fan", "content:publish")).toBe(false); });
  it("allows creators to publish but not moderate", () => { expect(hasPermission("creator", "content:publish")).toBe(true); expect(hasPermission("creator", "moderation:review")).toBe(false); });
  it("allows moderators to review without managing roles", () => { expect(hasPermission("moderator", "moderation:review")).toBe(true); expect(hasPermission("moderator", "role:manage")).toBe(false); });
  it("grants administrators the full permission set", () => expect(permissionsFor("admin")).toHaveLength(16));
});

describe("signed sessions", () => {
  it("round-trips a valid session", async () => { const token = await createSessionToken(safeUser(demoUsers[0]), 1_000); expect((await verifySessionToken(token, 2_000))?.role).toBe("fan"); });
  it("rejects tampered and expired sessions", async () => { const token = await createSessionToken(safeUser(demoUsers[1]), 1_000); expect(await verifySessionToken(`${token}x`, 2_000)).toBeNull(); expect(await verifySessionToken(token, 1_000 + 9 * 60 * 60 * 1000)).toBeNull(); });
});
