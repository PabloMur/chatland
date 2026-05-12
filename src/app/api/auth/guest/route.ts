import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const GUEST_TTL = 30 * 60; // 30 minutes in seconds

export async function POST() {
  const id = Math.random().toString(36).slice(2, 8);
  const num = Math.floor(1000 + Math.random() * 9000);
  const name = `Invitado#${num}`;
  const email = `guest_${id}@demo.chatland`;
  const secret = process.env.SECRET_KEY as string;

  const token = jwt.sign({ email, name, isGuest: true }, secret, {
    expiresIn: GUEST_TTL,
  });

  const response = NextResponse.json({ token, name, email }, { status: 200 });
  response.cookies.set("chatland-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: GUEST_TTL,
    path: "/",
  });

  return response;
}
