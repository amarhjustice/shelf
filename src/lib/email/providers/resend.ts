import { Resend } from "resend";
import { EmailMessage } from "../types";
import { EmailProvider, EmailSendResult } from "../provider";

export class ResendProvider implements EmailProvider {
  private client: Resend;
  private from: string;

  constructor(apiKey: string, from: string) {
    if (!apiKey) throw new Error("ResendProvider: missing API key");
    if (!from) throw new Error("ResendProvider: missing 'from' address");
    this.client = new Resend(apiKey);
    this.from = from;
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    const { data, error } = await this.client.emails.send({
      from: this.from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });

    if (error) {
      // Throw so BullMQ retries per the existing attempts/backoff config
      // instead of silently dropping the job.
      throw new Error(`Resend send failed: ${error.message}`);
    }

    return { providerMessageId: data?.id };
  }
}
