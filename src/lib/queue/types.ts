export type EmailJob = {
  type: "verification";
  to: string;
  encryptedToken: string;
};