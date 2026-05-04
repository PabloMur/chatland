import { firestoreDB } from "@/lib/FirestoreConn";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 });
    }

    const token = authorization.replace("Bearer ", "");
    const secret = process.env.SECRET_KEY as string;
    const decoded = jwt.verify(token, secret) as { email: string };

    const { email } = await params;

    if (decoded.email !== decodeURIComponent(email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const querySnapshot = await firestoreDB
      .collection("rooms")
      .where("createdBy", "==", decoded.email)
      .get();

    const roomIds = querySnapshot.docs.map((doc) => doc.id);
    return NextResponse.json({ roomIds }, { status: 200 });
  } catch (error) {
    console.error("[GET /room/my]", error);
    return NextResponse.json({ error: "Error al obtener salas" }, { status: 400 });
  }
}
