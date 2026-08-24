/**
 * Shelf — Email queue & message contracts
 *
 * EmailJob is what gets queued on BullMQ (matches your existing
 * Queue<EmailJob> / Worker<EmailJob> typing — this just widens the
 * union beyond "verification").
 *
 * EmailMessage is the fully-resolved payload a provider actually sends.
 * Templates (templates.ts) turn a decrypted EmailJob into an EmailMessage.
 */

export type VerificationEmailJob = {
  type: "verification";
  to: string;
  encryptedToken: string;
};

export type PasswordResetEmailJob = {
  type: "password_reset";
  to: string;
  encryptedToken: string;
};

export type NotificationEmailJob = {
  type: "notification";
  to: string;
  subject: string;
  message: string;
};

export type PurchaseEmailJob = {
  type: "purchase";
  to: string;
  resourceTitle: string;
  amount: string;
  currency: string;
};

export type EmailJob =
  | VerificationEmailJob
  | PasswordResetEmailJob
  | NotificationEmailJob
  | PurchaseEmailJob;

/** Fully-resolved message ready to hand to a provider. No secrets, no encrypted tokens. */
export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};
