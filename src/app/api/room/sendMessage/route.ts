import { realtimeDB } from "@/lib/FirestoreConn";
import { NextRequest, NextResponse } from "next/server";

type Message = {
  from: "owner" | "guest";
  message: string;
};
export async function PUT(request: NextRequest) {
  try {
    const { roomId, message, from } = await request.json();
    // Obtener la referencia a la chatroom en Realtime Database
    const roomRef = realtimeDB.ref(`rooms/${roomId}`);
    // Obtener los mensajes existentes en la chatroom
    const snapshot = await roomRef.get();
    const existingMessages: Message[] = snapshot.val()?.messages || [];
    // Crear el nuevo mensaje con guest en null por ahora
    const newMessage: Message = {
      from,
      message,
    };
    // Actualizar los mensajes en la chatroom agregando el nuevo mensaje
    await roomRef.update({
      messages: [...existingMessages, newMessage],
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
