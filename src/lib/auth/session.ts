import crypto from "node:crypto";

import { prisma } from "@/lib/prisma";

const SESSION_DURATION_DAYS = 30;
const SESSION_COOKIE_NAME = "shelf_session";

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createSession(userId: bigint) {
  const token = generateSessionToken();

  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
  );

  await prisma.user_sessions.create({
    data: {
      user_id: userId,
      token_hash: tokenHash,
      expires_at: expiresAt,
    },
  });

  return {
    token,
    expiresAt,
  };
}

export async function getSession(token: string) {
  const tokenHash = hashSessionToken(token);

  const session = await prisma.user_sessions.findUnique({
    where: {
      token_hash: tokenHash,
    },
    include: {
      users: {
        select: {
          user_id: true,
          full_name: true,
          email: true,
          email_verified: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.revoked_at) {
    return null;
  }

  if (session.expires_at <= new Date()) {
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const { cookies } = await import("next/headers");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await getSession(sessionToken);

  if (!session) {
    return null;
  }

  return session.users;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }

  return user;
}

export async function revokeSession(token: string): Promise<void> {
  const tokenHash = hashSessionToken(token);

  await prisma.user_sessions.updateMany({
    where: {
      token_hash: tokenHash,
      revoked_at: null,
    },
    data: {
      revoked_at: new Date(),
    },
  });
}