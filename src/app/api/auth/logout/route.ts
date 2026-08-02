import { NextResponse } from "next/server";
import { isSecureRequest, SESSION_COOKIE } from "@/lib/auth";

export function POST(request: Request) {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: isSecureRequest(request), sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
