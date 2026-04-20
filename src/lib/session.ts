import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionPayload } from "./definitions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// ─── Encrypt (sign JWT) ────────────────────────────────────────────────────
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
    expiresAt: payload.expiresAt.toISOString(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// ─── Decrypt (verify JWT) ──────────────────────────────────────────────────
export async function decrypt(
  session: string | undefined = ""
): Promise<{ userId: string; role: string; expiresAt: string } | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as { userId: string; role: string; expiresAt: string };
  } catch {
    console.log("Failed to verify session");
    return undefined;
  }
}

// ─── Create Session ────────────────────────────────────────────────────────
export async function createSession(
  userId: string,
  role: "CUSTOMER" | "WORKER" | "ADMIN"
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// ─── Get Session ───────────────────────────────────────────────────────────
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  const payload = await decrypt(session);
  if (!payload) return null;

  return {
    userId: payload.userId,
    role: payload.role as "CUSTOMER" | "WORKER" | "ADMIN",
    expiresAt: new Date(payload.expiresAt),
  };
}

// ─── Delete Session ────────────────────────────────────────────────────────
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// ─── Update Session (refresh expiry) ───────────────────────────────────────
export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });
}
