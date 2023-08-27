import { NextRequest, NextResponse } from "next/server";
import { firestoreDB, realtimeDB } from "@/app/lib/FirestoreConn";
//Endpoint para setear que soy guest en una room
//Tarea: Hacer que esto funcione con un controller
export async function PUT(request: NextRequest) {
  try {
    const { chatroomID, email, roomId } = await request.json();
    const ref = realtimeDB.ref(`rooms/${chatroomID}`);
    const firestoreRef = firestoreDB.collection("rooms").doc(roomId);
    const prevData = firestoreRef.get();
    await ref.update({
      guest: email,
    });
    const guestSetted = await firestoreRef.update({
      ...prevData,
      guest: email,
    });
    return NextResponse.json({ guestSetted });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
