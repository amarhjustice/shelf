import crypto from "node:crypto";

const EMAIL_VERIFICATION_DURATION_HOURS = 24;

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export function getVerificationTokenExpiry(): Date {
  return new Date(
    Date.now() + EMAIL_VERIFICATION_DURATION_HOURS * 60 * 60 * 1000
  );
}