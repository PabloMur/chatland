import AuthController from "@/lib/controllers/authController";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfterSecs } = checkRateLimit(`login:${ip}`);

  if (!allowed) {
    return NextResponse.json(
      { error: `Demasiados intentos. Intentá de nuevo en ${retryAfterSecs} segundos.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSecs) } }
    );
  }

  try {
    const token = await AuthController.retriveToken(request);
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Login exitoso — resetear el contador para esta IP
    resetRateLimit(`login:${ip}`);

    const response = NextResponse.json({ token }, { status: 200 });
    response.cookies.set("chatland-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 400 });
  }
}
