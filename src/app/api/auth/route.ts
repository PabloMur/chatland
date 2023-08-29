import { NextRequest, NextResponse } from "next/server";
//import AuthController from "@/lib/controllers/authController";

export async function POST(request: NextRequest) {
  //const auth = await AuthController.createAuth(request);
  return NextResponse.json({ authCreated: true }, { status: 200 });
}
