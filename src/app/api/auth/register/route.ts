import { NextResponse } from "next/server";

import { encryptToken } from "@/lib/auth/encryption";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import {
  generateVerificationToken,
  hashToken,
  getVerificationTokenExpiry,
} from "@/lib/auth/token";
import { registerSchema } from "@/lib/validation/auth";
import { emailQueue } from "@/lib/queue/queues/email.queue";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid registration details",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, email, password } = result.data;

    const passwordHash = await hashPassword(password);

    const registration = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.users.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return null;
      }

      const user = await tx.users.create({
        data: {
          full_name: fullName,
          email,
          password_hash: passwordHash,
        },
      });

      const verificationToken = generateVerificationToken();
      const verificationTokenHash = hashToken(verificationToken);
      const verificationExpiresAt = getVerificationTokenExpiry();

      await tx.email_verification_tokens.create({
        data: {
          user_id: user.user_id,
          token_hash: verificationTokenHash,
          expires_at: verificationExpiresAt,
        },
      });

    const encryptedVerificationToken = encryptToken(verificationToken);

return {
  userId: user.user_id,
  encryptedVerificationToken,
};
    });

    /*
     * Don't reveal whether the email already exists.
     */
    if (!registration) {
      return NextResponse.json({
        success: true,
        message:
          "If this email can be registered, a verification email will be sent.",
      });
    }

await emailQueue.add("email-verification", {
  type: "verification",
  to: email,
  encryptedToken: registration.encryptedVerificationToken,
});

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to complete registration",
      },
      { status: 500 }
    );
  }
}