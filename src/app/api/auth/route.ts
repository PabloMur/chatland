import { NextRequest, NextResponse } from "next/server";
import AuthController from "@/lib/controllers/authController";

export async function POST(request: NextRequest) {
  try {
    const auth = await AuthController.createAuth(request);
    return NextResponse.json({ authCreated: auth }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
