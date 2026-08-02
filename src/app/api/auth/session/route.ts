import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { permissionsFor, SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) return NextResponse.json({ authenticated: false, user: null, permissions: [] });
  const { issuedAt: _issuedAt, expiresAt: _expiresAt, version: _version, ...user } = session;
  void _issuedAt; void _expiresAt; void _version;
  return NextResponse.json({ authenticated: true, user, permissions: permissionsFor(user.role) });
}
