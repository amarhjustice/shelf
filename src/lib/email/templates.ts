import { EmailMessage } from "./types";

/**
 * Turns already-decrypted data into a sendable EmailMessage.
 * These functions never see ciphertext — the worker decrypts
 * encryptedToken BEFORE calling into here (see index.ts).
 */

export function buildVerificationEmail(to: string, verificationUrl: string): EmailMessage {
  return {
    to,
    subject: "Verify your Shelf account",
    text: `Welcome to Shelf. Verify your email: ${verificationUrl}`,
    html: `
      <p>Welcome to Shelf.</p>
      <p><a href="${verificationUrl}">Click here to verify your email address</a>.</p>
      <p>If you didn't create a Shelf account, you can ignore this email.</p>
    `.trim(),
  };
}

export function buildPasswordResetEmail(to: string, resetUrl: string): EmailMessage {
  return {
    to,
    subject: "Reset your Shelf password",
    text: `Reset your password: ${resetUrl}`,
    html: `
      <p>We received a request to reset your Shelf password.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a>.</p>
      <p>If you didn't request this, you can ignore this email — your password won't change.</p>
    `.trim(),
  };
}

export function buildNotificationEmail(to: string, subject: string, message: string): EmailMessage {
  return {
    to,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };
}

export function buildPurchaseEmail(
  to: string,
  resourceTitle: string,
  amount: string,
  currency: string
): EmailMessage {
  return {
    to,
    subject: `Your Shelf purchase: ${resourceTitle}`,
    text: `Thanks for your purchase of "${resourceTitle}" (${amount} ${currency}). It's now in your library.`,
    html: `
      <p>Thanks for your purchase.</p>
      <p><strong>${resourceTitle}</strong> — ${amount} ${currency}</p>
      <p>It's now available in your Shelf library.</p>
    `.trim(),
  };
}
