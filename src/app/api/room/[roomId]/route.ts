import { NextRequest, NextResponse } from "next/server";
import { firestoreDB } from "@/lib/FirestoreConn";
//Endpoint para obtener la id de la chatroom mediante el codigo mas pequeño
//Tarea: Hacer que esto funcione con un controller mejor
export async function GET(request: NextRequest, { params }: any) {
  try {
    const { roomId } = params;
    const snapshotRef = firestoreDB.collection("rooms").doc(roomId);
    const snapshot = await snapshotRef.get();
    let data = snapshot.data();
    if (data !== undefined && data !== null) {
      return NextResponse.json({ roomId: data.roomId }, { status: 200 });
    }
    return NextResponse.json({ error: 123 }, { status: 400 });
  } catch (error) {
    console.error(error);
  }
}
