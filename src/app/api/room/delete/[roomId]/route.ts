import { NextRequest, NextResponse } from "next/server";
import roomController from "@/lib/controllers/roomController";
//Falta que tambien se elimine en la realtime
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { roomId } = await params;
    const deletedRoomId = await roomController.deleteRoom(
      request,
      roomId
    );
    return NextResponse.json({ roomDeleted: deletedRoomId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
