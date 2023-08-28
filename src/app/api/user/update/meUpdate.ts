import { NextRequest, NextResponse } from "next/server";
import UserController from "@/lib/controllers/userController";

export async function PUT(request: NextRequest) {
  try {
    const userupdated = await UserController.updateUserData(request);
    return NextResponse.json({ userupdated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
