import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set("chatland-token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
