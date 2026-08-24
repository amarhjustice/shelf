import { EmailMessage } from "./types";

export type EmailSendResult = {
  /** Provider-assigned message id, if the provider returns one. */
  providerMessageId?: string;
};

/**
 * Contract every transactional email provider must implement.
 *
 * Providers should THROW on failure rather than swallow errors —
 * BullMQ is already configured with 3 attempts + exponential backoff,
 * so retry logic belongs in the queue, not here.
 */
export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailSendResult>;
}
