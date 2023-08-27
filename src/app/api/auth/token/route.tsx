import AuthController from "@/controllers/authController";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const token = await AuthController.retriveToken(request);
    return NextResponse.json(token, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
