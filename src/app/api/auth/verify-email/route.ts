import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/auth/token";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification token is missing.",
        },
        { status: 400 }
      );
    }

    const tokenHash = hashToken(token);

    const verificationToken =
      await prisma.email_verification_tokens.findFirst({
        where: {
          token_hash: tokenHash,
        },
        include: {
          users: true,
        },
      });

    if (!verificationToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification token.",
        },
        { status: 400 }
      );
    }

    if (verificationToken.used_at) {
      return NextResponse.json(
        {
          success: false,
          message: "This verification link has already been used.",
        },
        { status: 400 }
      );
    }

    if (verificationToken.expires_at <= new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "This verification link has expired.",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.users.update({
        where: {
          user_id: verificationToken.user_id,
        },
        data: {
          email_verified: true,
        },
      });

      await tx.email_verification_tokens.update({
        where: {
          token_id: verificationToken.token_id,
        },
        data: {
          used_at: new Date(),
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Your email has been verified successfully.",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify your email.",
      },
      { status: 500 }
    );
  }
}