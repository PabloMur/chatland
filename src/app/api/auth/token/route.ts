import AuthController from "@/lib/controllers/authController";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const token = await AuthController.retriveToken(request);
    return NextResponse.json({ token: token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 123 }, { status: 400 });
  }
}
