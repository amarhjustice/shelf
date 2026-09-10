import { Worker } from "bullmq";
import { redisConnection } from "../src/lib/queue/connection";
import { processEmailJob } from "../src/lib/email";
import type { EmailJob } from "@/lib/queue/types";

const emailWorker = new Worker<EmailJob>(
  "email",
  async (job) => {
    console.log("Processing email job:", job.id);

    await processEmailJob(job.data);

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