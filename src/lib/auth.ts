export const roles = ["fan", "creator", "moderator", "admin"] as const;
export type Role = (typeof roles)[number];

export const permissions = [
  "profile:read",
  "profile:update",
  "creator:follow",
  "content:purchase",
  "message:member",
  "creator:manage",
  "content:publish",
  "analytics:creator",
  "payout:receive",
  "moderation:review",
  "report:manage",
  "account:suspend",
  "user:manage",
  "role:manage",
  "policy:manage",
  "audit:read",
] as const;
export type Permission = (typeof permissions)[number];

const rolePermissions: Record<Role, readonly Permission[]> = {
  fan: ["profile:read", "profile:update", "creator:follow", "content:purchase", "message:member"],
  creator: ["profile:read", "profile:update", "creator:follow", "content:purchase", "message:member", "creator:manage", "content:publish", "analytics:creator", "payout:receive"],
  moderator: ["profile:read", "profile:update", "moderation:review", "report:manage", "account:suspend", "audit:read"],
  admin: permissions,
};

export type SafeUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  initials: string;
};

type DemoUser = SafeUser & { password: string };

export const demoUsers: readonly DemoUser[] = [
  { id: "10000000-0000-4000-8000-000000000001", email: "fan@velora.demo", password: "FanDemo!2026", name: "Sahin Amini", role: "fan", initials: "SA" },
  { id: "10000000-0000-4000-8000-000000000002", email: "creator@velora.demo", password: "CreatorDemo!2026", name: "Maya Chen", role: "creator", initials: "MC" },
  { id: "10000000-0000-4000-8000-000000000003", email: "moderator@velora.demo", password: "ModeratorDemo!2026", name: "Alex Morgan", role: "moderator", initials: "AM" },
  { id: "10000000-0000-4000-8000-000000000004", email: "admin@velora.demo", password: "AdminDemo!2026", name: "Jordan Lee", role: "admin", initials: "JL" },
] as const;

export function permissionsFor(role: Role): readonly Permission[] { return rolePermissions[role]; }
export function hasPermission(role: Role, permission: Permission): boolean { return rolePermissions[role].includes(permission); }
export function isRole(value: unknown): value is Role { return typeof value === "string" && roles.includes(value as Role); }
export function safeUser(user: DemoUser): SafeUser { const { password: _password, ...safe } = user; void _password; return safe; }

export const SESSION_COOKIE = "velora_session";
const FALLBACK_DEMO_SECRET = "velora-safe-demo-secret-change-before-real-deployment";

type SessionPayload = SafeUser & { issuedAt: number; expiresAt: number; version: 1 };

function encode(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBytes(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function decode(input: string): string { return new TextDecoder().decode(decodeBytes(input)); }

function secret(): string {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (process.env.SAFE_DEMO_MODE === "false") throw new Error("AUTH_SECRET is required outside safe-demo mode.");
  return FALLBACK_DEMO_SECRET;
}

async function signingKey(usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, usage);
}

async function signature(value: string): Promise<string> {
  const key = await signingKey(["sign"]);
  return encode(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))));
}

async function validSignature(value: string, supplied: string): Promise<boolean> {
  try {
    const key = await signingKey(["verify"]);
    const decoded = decodeBytes(supplied);
    const signatureBytes = new Uint8Array(decoded.byteLength);
    signatureBytes.set(decoded);
    return crypto.subtle.verify("HMAC", key, signatureBytes, new TextEncoder().encode(value));
  } catch { return false; }
}

export async function createSessionToken(user: SafeUser, now = Date.now()): Promise<string> {
  const payload: SessionPayload = { ...user, issuedAt: now, expiresAt: now + 8 * 60 * 60 * 1000, version: 1 };
  const body = encode(JSON.stringify(payload));
  return `${body}.${await signature(body)}`;
}

export async function verifySessionToken(token: string | undefined, now = Date.now()): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, supplied, extra] = token.split(".");
  if (!body || !supplied || extra || !(await validSignature(body, supplied))) return null;
  try {
    const payload = JSON.parse(decode(body)) as Partial<SessionPayload>;
    if (payload.version !== 1 || typeof payload.expiresAt !== "number" || payload.expiresAt <= now || !isRole(payload.role) || typeof payload.id !== "string" || typeof payload.email !== "string" || typeof payload.name !== "string" || typeof payload.initials !== "string") return null;
    return payload as SessionPayload;
  } catch { return null; }
}

export function findDemoUser(email: string): DemoUser | undefined { return demoUsers.find((user) => user.email === email.trim().toLowerCase()); }

export function credentialsMatch(user: DemoUser, password: string): boolean {
  if (password.length !== user.password.length) return false;
  let difference = 0;
  for (let index = 0; index < password.length; index += 1) difference |= password.charCodeAt(index) ^ user.password.charCodeAt(index);
  return difference === 0;
}

export function isSecureRequest(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  return forwarded ? forwarded === "https" : new URL(request.url).protocol === "https:";
}
