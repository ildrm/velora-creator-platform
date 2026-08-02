import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken, type Role } from "@/lib/auth";

const protectedRoutes: Array<{ prefix: string; roles?: readonly Role[] }> = [
  { prefix: "/profile" },
  { prefix: "/messages" },
  { prefix: "/vault" },
  { prefix: "/verify" },
  { prefix: "/studio", roles: ["creator", "admin"] },
  { prefix: "/moderation", roles: ["moderator", "admin"] },
  { prefix: "/admin", roles: ["admin"] },
];

export async function proxy(request: NextRequest) {
  const rule = protectedRoutes.find(({ prefix }) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`));
  if (!rule) return NextResponse.next();
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(login);
  }
  if (rule.roles && !rule.roles.includes(session.role)) {
    const denied = new URL("/unauthorized", request.url);
    denied.searchParams.set("required", rule.roles.join(","));
    return NextResponse.redirect(denied);
  }
  const response = NextResponse.next();
  response.headers.set("x-authenticated-user", session.id);
  response.headers.set("x-authenticated-role", session.role);
  return response;
}

export const config = { matcher: ["/profile/:path*", "/messages/:path*", "/vault/:path*", "/verify/:path*", "/studio/:path*", "/moderation/:path*", "/admin/:path*"] };
