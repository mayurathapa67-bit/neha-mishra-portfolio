import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const AUTH_COOKIE = "nm_admin_session";
const SECRET = process.env.AUTH_SECRET ?? "neha-portfolio-dev-secret-change-me";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createToken(): string {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifyToken(token: string): boolean {
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  const expected = sign(issuedAt);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;
  const age = Date.now() - Number(issuedAt);
  return age > 0 && age < MAX_AGE_SECONDS * 1000;
}

export async function getSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  return token ? verifyToken(token) : false;
}

export const AUTH_MAX_AGE_SECONDS = MAX_AGE_SECONDS;

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: MAX_AGE_SECONDS,
};
