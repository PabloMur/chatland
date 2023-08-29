import AuthController from "@/lib/controllers/authController";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const token = await AuthController.retriveToken(request);
    if (token) {
      return NextResponse.json({ token: token }, { status: 200 });
    }
    return NextResponse.json({ error: 123 }, { status: 400 });
  } catch (error) {
    console.error(error);
  }
}
