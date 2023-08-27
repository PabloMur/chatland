import { firestoreDB } from "@/app/lib/FirestoreConn";
import { NextRequest, NextResponse } from "next/server";
//probablemente esto deba ser modificadao para que se use una queri mas que la url
//Tarea: Hacer que esto funcione gracias al controler

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { email } = params;
    const querySnapshot = await firestoreDB
      .collection("rooms")
      .where("createdBy", "==", email)
      .get();

    const roomIds = querySnapshot.docs.map((doc) => doc.id);
    return NextResponse.json({ roomIds }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
