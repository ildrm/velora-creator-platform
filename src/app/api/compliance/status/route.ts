import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasPermission, SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const QuerySchema = z.string().uuid().optional();

export async function GET(request: Request) {
  const session = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "authentication_required" }, { status: 401 });
  const userId = new URL(request.url).searchParams.get("userId") ?? undefined;
  const parsed = QuerySchema.safeParse(userId);
  if (!parsed.success) return NextResponse.json({ error: "invalid_user_id" }, { status: 400 });
  if (parsed.data && parsed.data !== session.id && !hasPermission(session.role, "user:manage")) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  return NextResponse.json({
    userId: parsed.data ?? session.id,
    ageAssurance: { status: "required", rawIdentityStored: false },
    creatorIdentity: { status: "not_applicable" },
    payout: { status: "blocked", reason: "age_assurance_required" },
    environment: "safe-demo",
  });
}
