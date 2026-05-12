import { realtimeDB } from "@/lib/FirestoreConn";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const MAX_MESSAGES = 200;

type Message = {
  from: string;
  message: string;
};

export async function PUT(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 });
    }

    const token = authorization.replace("Bearer ", "");
    const secret = process.env.SECRET_KEY as string;
    const decoded = jwt.verify(token, secret) as { email: string };

    const { roomId, message } = await request.json();

    if (!roomId || !message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const roomRef = realtimeDB.ref(`rooms/${roomId}`);
    const snapshot = await roomRef.get();
    const roomData = snapshot.val();

    if (!roomData) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Verificar que el sender pertenece a la sala (seguridad server-side)
    const { createdBy, guest } = roomData;
    if (decoded.email !== createdBy && decoded.email !== guest) {
      return NextResponse.json({ error: "Not a member of this room" }, { status: 403 });
    }

    const existingMessages: Message[] = roomData.messages || [];
    const newMessage: Message = { from: decoded.email, message: message.trim() };

    // Mantener solo los últimos MAX_MESSAGES para no superar el límite de Realtime DB
    const updatedMessages = [...existingMessages, newMessage].slice(-MAX_MESSAGES);

    await roomRef.update({ messages: updatedMessages });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[sendMessage]", error);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }
}
