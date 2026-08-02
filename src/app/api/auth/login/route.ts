import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionToken, credentialsMatch, findDemoUser, isSecureRequest, permissionsFor, safeUser, SESSION_COOKIE } from "@/lib/auth";

const LoginSchema = z.object({ email: z.string().email().max(254), password: z.string().min(8).max(128) });

export async function POST(request: Request) {
  const parsed = LoginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  const match = findDemoUser(parsed.data.email);
  if (!match || !credentialsMatch(match, parsed.data.password)) return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  const user = safeUser(match);
  const response = NextResponse.json({ authenticated: true, user, permissions: permissionsFor(user.role) });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(user), { httpOnly: true, secure: isSecureRequest(request), sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 });
  return response;
}
