import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({
        success: true,
        user: null,
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        userId: user.user_id.toString(),
        fullName: user.full_name,
        email: user.email,
        emailVerified: user.email_verified,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to get current user.",
      },
      { status: 500 }
    );
  }
}