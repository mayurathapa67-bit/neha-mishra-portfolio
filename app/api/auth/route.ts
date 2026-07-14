import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  AUTH_COOKIE,
  AUTH_MAX_AGE_SECONDS,
  authCookieOptions,
  createToken,
  verifyToken,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, createToken(), {
    ...authCookieOptions,
    maxAge: AUTH_MAX_AGE_SECONDS,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, "", {
    ...authCookieOptions,
    maxAge: 0,
  });
  return res;
}

export async function GET() {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  return NextResponse.json({ authenticated: token ? verifyToken(token) : false });
}
