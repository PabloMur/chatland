import { NextRequest, NextResponse } from "next/server";
import { firestoreDB, realtimeDB } from "@/lib/FirestoreConn";

export async function PUT(request: NextRequest) {
  try {
    const { chatroomID, email, roomId } = await request.json();

    if (!chatroomID || !email || !roomId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.all([
      realtimeDB.ref(`rooms/${chatroomID}`).update({ guest: email }),
      firestoreDB.collection("rooms").doc(roomId).update({ guest: email }),
    ]);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[setGuest]", error);
    return NextResponse.json({ error: "Error al unirse a la sala" }, { status: 400 });
  }
}
