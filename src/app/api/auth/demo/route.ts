import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { firestoreDB, realtimeDB } from "@/lib/FirestoreConn";
import admin from "firebase-admin";
import { generarNumeroAleatorio } from "@/lib/tools";

const GUEST_TTL = 30 * 60;
const DEMO_OWNER = "demo@chatland.com";

const DEMO_MESSAGES = [
  { from: DEMO_OWNER, message: "¡Hola! Bienvenido a Chatland 👋" },
  { from: DEMO_OWNER, message: "Esta es una sala de chat en tiempo real. Dos personas pueden conectarse usando el código de sala." },
  { from: DEMO_OWNER, message: "Probá escribir un mensaje acá abajo ↓" },
];

export async function POST() {
  try {
    const id = Math.random().toString(36).slice(2, 8);
    const num = Math.floor(1000 + Math.random() * 9000);
    const name = `Invitado#${num}`;
    const email = `guest_${id}@demo.chatland`;
    const secret = process.env.SECRET_KEY as string;

    const token = jwt.sign({ email, name, isGuest: true }, secret, {
      expiresIn: GUEST_TTL,
    });

    // Crear sala demo en Realtime DB
    const realtimeKey = nanoid();
    await realtimeDB.ref(`rooms/${realtimeKey}`).set({
      createdBy: DEMO_OWNER,
      guest: email,
      messages: DEMO_MESSAGES,
    });

    // Crear sala demo en Firestore
    const roomId = generarNumeroAleatorio().toString();
    await firestoreDB.collection("rooms").doc(roomId).set({
      roomId: realtimeKey,
      guest: email,
      createdBy: DEMO_OWNER,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isDemo: true,
    });

    const response = NextResponse.json(
      { token, name, email, roomId, chatroomID: realtimeKey },
      { status: 200 }
    );
    response.cookies.set("chatland-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: GUEST_TTL,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[demo]", error);
    return NextResponse.json({ error: "Error al iniciar demo" }, { status: 500 });
  }
}
