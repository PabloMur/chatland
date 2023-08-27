import { NextRequest, NextResponse } from "next/server";
import { firestoreDB } from "@/app/lib/FirestoreConn";
//Endpoint para obtener la data de las salas en las que soy invitado
//Tarea: Hacer que esto suceda mediante un controller
export async function GET(request: NextRequest, { params }: any) {
  try {
    const { email } = params;
    const querySnapshot = await firestoreDB
      .collection("rooms")
      .where("guest", "==", email)
      .get();

    const roomIds = querySnapshot.docs.map((doc) => doc.id);
    return NextResponse.json({ roomIds }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 200 });
  }
}
