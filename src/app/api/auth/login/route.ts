import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation/auth";

const SESSION_COOKIE_NAME = "shelf_session";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.password_hash
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (!user.email_verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email before logging in.",
        },
        { status: 403 }
      );
    }

    const session = await createSession(user.user_id);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: session.expiresAt,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to log in.",
      },
      { status: 500 }
    );
  }
}
