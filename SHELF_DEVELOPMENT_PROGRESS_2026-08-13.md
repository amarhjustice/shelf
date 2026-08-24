# Shelf — Development Progress

## Session Summary — August 13, 2026

Today we completed the PostgreSQL/Prisma integration, password security foundation, queue infrastructure, registration API, and secure verification-token handling.

## Completed

### PostgreSQL + Prisma
- Connected Shelf to the existing local PostgreSQL database `shelf`.
- Database: `shelf`, host `localhost`, port `5432`.
- Introspected the existing database with `npx prisma db pull`.
- Generated Prisma Client with `npx prisma generate`.
- Prisma Client output: `src/generated/prisma`.
- Database currently contains 13 models, including users, sessions, verification/reset tokens, resources, books, authors, genres, languages, topics, and their relationship tables.
- Prisma reported existing PostgreSQL check constraints and an expression index that Prisma Client does not fully support; these remain database-level constraints/indexes.

### Password security
- Installed `argon2`.
- Verified Argon2id password hashing.
- Correct password verification succeeds and incorrect password verification fails.
- Passwords are not stored as plaintext.

### Validation
- Installed `zod`.
- Registration input is validated before database operations.

### Redis + BullMQ
- Created an Upstash Redis database.
- Added `bullmq@6.1.0`.
- Added the Redis connection through `REDIS_URL`.
- `.env` is ignored by Git.
- Created an email queue and dedicated worker.
- Worker command:
  `npm run worker:email`
- Queue reliability settings:
  - 3 attempts
  - exponential backoff
  - 100 completed jobs retained
  - 500 failed jobs retained
- Worker concurrency is currently 5.
- Successfully tested API → BullMQ → Upstash → worker processing.

### Explicit queue contract
A shared `EmailJob` contract was introduced so producers and workers use the same type.

Current verification job shape:

```ts
export type EmailJob = {
  type: "verification";
  to: string;
  encryptedToken: string;
};
```

The queue and worker are typed with `Queue<EmailJob>` and `Worker<EmailJob>`.

### Registration API
Implemented:

`POST /api/auth/register`

The registration flow now:
1. Validates input with Zod.
2. Hashes the password with Argon2id.
3. Checks whether the email already exists.
4. Creates the user inside a Prisma transaction.
5. Generates a verification token.
6. Stores only the token hash in PostgreSQL.
7. Encrypts the raw token for the queue.
8. Adds the verification job to BullMQ.
9. Returns a successful registration response.

A real registration test succeeded and the email worker processed the resulting job.

### Verification-token security
We specifically fixed the earlier problem where the raw verification token was being placed directly into Redis and printed by the worker.

Current design:

```text
Raw verification token
        |
        +---- SHA-256 hash ------> PostgreSQL
        |
        +---- AES-256-GCM -------> BullMQ / Upstash
```

Created:

`src/lib/auth/encryption.ts`

Encryption uses AES-256-GCM with a random IV.

The encryption key is stored in:

```env
TOKEN_ENCRYPTION_KEY=...
```

The key is a 32-byte value represented as 64 hexadecimal characters and must never be committed or shared.

The worker now receives the encrypted token and does not intentionally log the token.

### Application URL
Configured for local development:

```env
APP_URL=http://localhost:3000
```

The production value will be changed when Shelf is deployed.

### Verification-email preparation
The worker can decrypt the encrypted token in memory and prepare a verification URL in the form:

```text
APP_URL/api/auth/verify-email?token=...
```

The token and verification URL should not be logged.

### TypeScript
The project was repeatedly checked with:

```bash
npx tsc --noEmit
```

At the end of today's work:

```text
0 TypeScript errors
```

---

# Current Architecture

```text
                 Registration API
                       |
             +---------+---------+
             |                   |
             v                   v
       Argon2id hash       Verification token
             |                   |
             v              +----+----+
        PostgreSQL          |         |
                            v         v
                       SHA-256    AES-256-GCM
                          |           |
                          v           v
                     PostgreSQL   BullMQ/Upstash
                                      |
                                      v
                                Email Worker
                                      |
                                      v
                              Email Provider
```

The overall goal is a fast, secure, and scalable system where slow external operations such as email sending do not block API requests.

---

# Next Step: Email Provider

The next task is to integrate a transactional email provider.

Recommended architecture:

```text
Email Worker
      |
      v
Email Provider Interface
      |
      v
Transactional Email Provider
```

The worker should process queue jobs, while a separate provider layer handles communication with the external email service. This keeps Shelf independent of a single email provider.

The planned provider to evaluate/integrate next is **Resend**.

The provider will eventually handle:
- Email verification
- Password reset emails
- Account/security notifications
- Purchase/payment-related emails
- Other transactional emails

---

# After Email Provider Integration

Implement:

```text
/api/auth/verify-email
```

The verification endpoint should:

1. Receive the verification token.
2. Hash the token.
3. Find the matching verification record.
4. Check that the token exists.
5. Check that it has not expired.
6. Check that it has not already been used.
7. Mark the user as verified.
8. Mark the verification token as used.
9. Perform related database changes atomically.
10. Return an appropriate response.

Then test the complete flow:

```text
Register
   ↓
Queue
   ↓
Worker
   ↓
Email Provider
   ↓
Verification Email
   ↓
Click Verification Link
   ↓
Verify Account
```

---

# Security and Scalability Principles

Shelf is being built with these principles:

- Argon2id for passwords.
- Verification tokens stored as hashes in PostgreSQL.
- Sensitive queue tokens encrypted with AES-256-GCM.
- Secrets stored in environment variables.
- `.env` excluded from Git.
- Zod validation at API boundaries.
- Prisma for database access.
- BullMQ for background work.
- Upstash Redis for queue infrastructure.
- Queue retries with exponential backoff.
- Explicit TypeScript queue contracts.
- Worker concurrency separated from API requests.
- Sensitive tokens are not intentionally logged.
- Email sending separated from the main API request.
- TypeScript checking used to catch implementation and contract errors early.

---

# Status

## Completed

- [x] PostgreSQL database
- [x] Prisma database introspection
- [x] Prisma Client generation
- [x] Prisma application connection
- [x] Argon2id password hashing
- [x] Zod registration validation
- [x] Upstash Redis
- [x] BullMQ
- [x] Email queue
- [x] Email worker
- [x] Queue retries/backoff
- [x] Explicit email queue contract
- [x] Registration API
- [x] Verification token hashing
- [x] Verification token encryption
- [x] Secure environment variables
- [x] Registration → Queue → Worker test
- [x] Clean TypeScript compilation

## Next

- [ ] Transactional email provider
- [ ] Real verification email
- [ ] Email verification endpoint
- [ ] Complete registration → verification flow
- [ ] Password reset flow
- [ ] Authentication/session flow
- [ ] Rate limiting
- [ ] Production hardening
- [ ] Monitoring and error tracking
- [ ] Deployment

---

**Last updated:** August 13, 2026
