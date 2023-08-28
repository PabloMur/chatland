import { NextRequest, NextResponse } from "next/server";
import UserController from "@/lib/controllers/userController";
import AuthController from "@/lib/controllers/authController";

export async function DELETE(request: NextRequest) {
  try {
    const deletingUser = await UserController.deleteAccount(request);
    const deletingAuth = await AuthController.deleteAuth(request);
    if (deletingUser && deletingAuth) {
      return NextResponse.json({ deletingUser, deletingAuth }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
