import { NextResponse } from "next/server";
import AuthController from "@/lib/controllers/authController";

export async function POST(request: Request) {
  try {
    await AuthController.createAuth(request);
    return NextResponse.json({ authCreated: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
