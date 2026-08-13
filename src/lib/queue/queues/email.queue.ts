import { Queue } from "bullmq";
import { redisConnection } from "../connection";
import type { EmailJob } from "../types";

export const emailQueue = new Queue<EmailJob>("email", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
});