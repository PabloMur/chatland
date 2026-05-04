import { NextResponse } from "next/server";
import UserController from "@/lib/controllers/userController";
import AuthController from "@/lib/controllers/authController";

export async function DELETE() {
  try {
    const [deletingUser, deletingAuth] = await Promise.all([
      UserController.deleteAccount(),
      AuthController.deleteAuth(),
    ]);

    if (deletingUser && deletingAuth) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Error al eliminar la cuenta" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar la cuenta" }, { status: 400 });
  }
}
