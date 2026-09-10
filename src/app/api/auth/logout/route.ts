import { NextResponse } from "next/server";

import { revokeSession } from "@/lib/auth/session";

const SESSION_COOKIE_NAME = "shelf_session";

export async function POST(request: Request) {
  try {
    const sessionToken = request.headers
      .get("cookie")
      ?.split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${SESSION_COOKIE_NAME}=`))
      ?.split("=")
      .slice(1)
      .join("=");

    if (sessionToken) {
      await revokeSession(sessionToken);
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to log out.",
      },
      { status: 500 }
    );
  }
}