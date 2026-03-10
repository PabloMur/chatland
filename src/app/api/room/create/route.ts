import roomController from "@/lib/controllers/roomController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const roomCreatedId = await roomController.createChatroom(request);
    if (!roomCreatedId || typeof roomCreatedId !== "string") {
      return NextResponse.json({ error: "Failed to create room" }, { status: 400 });
    }
    return NextResponse.json(
      { roomCreated: { roomId: roomCreatedId } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
