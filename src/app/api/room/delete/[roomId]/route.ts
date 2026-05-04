import { NextRequest, NextResponse } from "next/server";
import RoomController from "@/lib/controllers/roomController";

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { roomId } = await params;
    const result = await RoomController.deleteRoom(request, roomId);

    if (result && "error" in result) {
      const status = result.error === "Not authorized to delete this room" ? 403 : 400;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /room/delete]", error);
    return NextResponse.json({ error: "Error al eliminar la sala" }, { status: 500 });
  }
}
