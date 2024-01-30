import { NextRequest, NextResponse } from "next/server";
import UserController from "@/lib/controllers/userController";
export async function GET(request: NextRequest, { params }: any) {
  try {
    const { email } = params;
    const checkEmail = await UserController.checkEmail(email);
    return NextResponse.json({ checkEmail }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
