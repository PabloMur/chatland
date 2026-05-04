import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { blacklistToken } from "@/lib/auth/tokenBlacklist";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("chatland-token")?.value;

  if (token) {
    try {
      // Decodificar sin verificar solo para leer el exp
      const decoded = jwt.decode(token) as { exp?: number } | null;
      const expiresAt = decoded?.exp ? decoded.exp * 1000 : Date.now() + 7 * 24 * 60 * 60 * 1000;
      blacklistToken(token, expiresAt);
    } catch {
      // Si no se puede decodificar, no importa — la cookie se borra igual
    }
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set("chatland-token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
