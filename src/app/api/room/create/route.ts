import RoomController from "@/lib/controllers/roomController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const roomCreatedId = await RoomController.createChatroom(request);
    if (!roomCreatedId || typeof roomCreatedId !== "string") {
      return NextResponse.json({ error: "Error al crear la sala" }, { status: 400 });
    }
    return NextResponse.json({ roomCreated: { roomId: roomCreatedId } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear la sala" }, { status: 400 });
  }
}
