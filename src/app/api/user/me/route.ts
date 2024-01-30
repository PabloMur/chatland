import { NextRequest, NextResponse } from "next/server";
import UserController from "@/lib/controllers/userController";

export async function POST(request: NextRequest) {
  try {
    const userData = await UserController.getUserData(request);
    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
