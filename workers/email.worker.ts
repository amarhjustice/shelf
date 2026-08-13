import { Worker, Job } from "bullmq";
import { redisConnection } from "../src/lib/queue/connection";
import { decryptToken } from "../src/lib/auth/encryption";
import type { EmailJob } from "@/lib/queue/types";

const emailWorker = new Worker<EmailJob>(
  "email",
  async (job) => {
    console.log("Processing email job:", job.id);

    if (job.data.type === "verification") {
      const token = decryptToken(job.data.encryptedToken);

      const verificationUrl =
        `${process.env.APP_URL}/api/auth/verify-email` +
        `?token=${encodeURIComponent(token)}`;

      console.log("To:", job.data.to);
      console.log("Verification email prepared");

      // Email provider will be connected here.
      // IMPORTANT: Do not log the token or verificationUrl.

      void verificationUrl;
    }

    return {
      success: true,
    };
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, error) => {
  console.error(`Email job ${job?.id} failed:`, error);
});

console.log("Email worker started...");