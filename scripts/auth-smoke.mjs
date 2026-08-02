const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3003";

const accounts = [
  { role: "fan", email: "fan@velora.demo", password: "FanDemo!2026", allowed: ["/profile"], denied: ["/studio", "/moderation", "/admin"] },
  { role: "creator", email: "creator@velora.demo", password: "CreatorDemo!2026", allowed: ["/profile", "/studio"], denied: ["/moderation", "/admin"] },
  { role: "moderator", email: "moderator@velora.demo", password: "ModeratorDemo!2026", allowed: ["/profile", "/moderation"], denied: ["/studio", "/admin"] },
  { role: "admin", email: "admin@velora.demo", password: "AdminDemo!2026", allowed: ["/profile", "/studio", "/moderation", "/admin"], denied: [] },
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(path, options = {}, cookie = "") {
  const headers = new Headers(options.headers);
  if (cookie) headers.set("cookie", cookie);
  return fetch(`${baseUrl}${path}`, { ...options, headers, redirect: "manual" });
}

const anonymous = await request("/api/auth/session");
assert(anonymous.status === 200 && !(await anonymous.json()).authenticated, "Anonymous session must be logged out");
const anonymousProfile = await request("/profile");
assert(anonymousProfile.status === 307 && anonymousProfile.headers.get("location")?.includes("/login?next=%2Fprofile"), "Anonymous profile access must redirect to login");
const anonymousCompliance = await request("/api/compliance/status");
assert(anonymousCompliance.status === 401, "Anonymous compliance access must be rejected");
const invalid = await request("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "fan@velora.demo", password: "incorrect-password" }) });
assert(invalid.status === 401, "Invalid credentials must be rejected");

for (const account of accounts) {
  const login = await request("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: account.email, password: account.password }) });
  assert(login.status === 200, `${account.role} login failed`);
  const setCookie = login.headers.get("set-cookie");
  assert(setCookie?.includes("HttpOnly") && setCookie.includes("SameSite=lax"), `${account.role} session cookie flags are incomplete`);
  const cookie = setCookie.split(";", 1)[0];
  const session = await request("/api/auth/session", {}, cookie);
  const sessionBody = await session.json();
  assert(sessionBody.authenticated && sessionBody.user.role === account.role, `${account.role} session did not round-trip`);
  const ownCompliance = await request("/api/compliance/status", {}, cookie);
  assert(ownCompliance.status === 200, `${account.role} should read their own compliance status`);
  const otherCompliance = await request("/api/compliance/status?userId=10000000-0000-4000-8000-000000000099", {}, cookie);
  assert(otherCompliance.status === (account.role === "admin" ? 200 : 403), `${account.role} cross-account compliance permission is incorrect`);

  for (const route of account.allowed) {
    const response = await request(route, {}, cookie);
    assert(response.status === 200, `${account.role} should access ${route}, received ${response.status}`);
  }
  for (const route of account.denied) {
    const response = await request(route, {}, cookie);
    assert(response.status === 307 && response.headers.get("location")?.includes("/unauthorized"), `${account.role} should be denied ${route}`);
  }

  const logout = await request("/api/auth/logout", { method: "POST" }, cookie);
  assert(logout.status === 200 && logout.headers.get("set-cookie")?.includes("Max-Age=0"), `${account.role} logout must clear the cookie`);
}

console.log(`Authentication smoke test passed for ${accounts.length} roles at ${baseUrl}`);
