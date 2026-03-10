import AuthController from "@/lib/controllers/authController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = await AuthController.retriveToken(request);
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ token }, { status: 200 });

    // Cookie HTTP-only: no accesible desde JS, más segura
    response.cookies.set("chatland-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 400 });
  }
}
