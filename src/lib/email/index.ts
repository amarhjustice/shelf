import { EmailProvider } from "./provider";
import { ResendProvider } from "./providers/resend";
import { EmailJob } from "./types";
import {
  buildVerificationEmail,
  buildPasswordResetEmail,
  buildNotificationEmail,
  buildPurchaseEmail,
} from "./templates";
// NOTE: adjust this import to match the actual exported name/signature
// of your AES-256-GCM decrypt function in src/lib/auth/encryption.ts.
import { decryptToken } from "../auth/encryption";

export * from "./types";
export * from "./provider";
export * from "./templates";
export { ResendProvider };

let providerInstance: EmailProvider | null = null;

/** Lazily builds the configured provider from env vars. Call once at worker startup. */
export function getEmailProvider(): EmailProvider {
  if (providerInstance) return providerInstance;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("Missing RESEND_API_KEY or EMAIL_FROM in environment");
  }

  providerInstance = new ResendProvider(apiKey, from);
  return providerInstance;
}

/**
 * Resolves an EmailJob (decrypting tokens where needed) into a message,
 * then sends it via the configured provider. This is what the worker
 * should call for every job it pulls off the queue.
 */
export async function processEmailJob(job: EmailJob): Promise<void> {
  const provider = getEmailProvider();
  const appUrl = process.env.APP_URL;
  if (!appUrl) throw new Error("Missing APP_URL in environment");

  switch (job.type) {
    case "verification": {
      const token = decryptToken(job.encryptedToken);
      const url = `${appUrl}/api/auth/verify-email?token=${token}`;
      await provider.send(buildVerificationEmail(job.to, url));
      return;
    }
    case "password_reset": {
      const token = decryptToken(job.encryptedToken);
      const url = `${appUrl}/api/auth/reset-password?token=${token}`;
      await provider.send(buildPasswordResetEmail(job.to, url));
      return;
    }
    case "notification": {
      await provider.send(buildNotificationEmail(job.to, job.subject, job.message));
      return;
    }
    case "purchase": {
      await provider.send(
        buildPurchaseEmail(job.to, job.resourceTitle, job.amount, job.currency)
      );
      return;
    }
    default: {
      // Exhaustiveness check — TS errors here if a job type is ever added
      // to EmailJob without a matching case above.
      const _exhaustive: never = job;
      throw new Error(`Unhandled email job type: ${(_exhaustive as EmailJob).type}`);
    }
  }
}
