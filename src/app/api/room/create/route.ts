import roomController from "@/controllers/roomController";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const roomCreatedId = await roomController.createChatroom(request);
    return NextResponse.json(
      {
        roomCreated: {
          roomId: roomCreatedId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
