import { NextRequest, NextResponse } from "next/server";
import UserController from "@/lib/controllers/userController";

export async function POST(request: NextRequest) {
  try {
    const userCreated = await UserController.createUser(request);
    return NextResponse.json({ userCreated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear el usuario" }, { status: 400 });
  }
}
