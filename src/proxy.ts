import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = ["/home", "/my-rooms", "/profile", "/room"];
const PUBLIC = ["/", "/login", "/signup", "/password", "/forgot-password", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some((r) => pathname.startsWith(r));
  const isPublic = PUBLIC.includes(pathname);

  const token = request.cookies.get("chatland-token")?.value;

  // Ruta protegida sin token → redirigir a login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Ruta protegida con token → verificar que sea válido
  if (isProtected && token) {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      await jwtVerify(token, secret);
    } catch {
      // Token expirado o inválido → borrar cookie y redirigir
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("chatland-token", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  // Usuario ya autenticado intenta ir a login/signup → redirigir a home
  if (isPublic && token && pathname !== "/") {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/home", request.url));
    } catch {
      // Token inválido, dejarlo pasar a la página pública
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/my-rooms", "/profile", "/room/:path*", "/login", "/signup", "/password", "/forgot-password", "/reset-password"],
};
