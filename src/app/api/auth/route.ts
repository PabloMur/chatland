import { NextResponse } from "next/server";
import AuthController from "@/lib/controllers/authController";

export async function POST(request: Request) {
  try {
    const auth = await AuthController.createAuth(request);
    if (auth) {
      return NextResponse.json({ authCreated: auth }, { status: 200 });
    } else {
      return NextResponse.json({ authCreated: auth }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
