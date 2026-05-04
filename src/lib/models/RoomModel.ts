import { firestoreDB, realtimeDB } from "@/lib/FirestoreConn";

class RoomModel {
  static async deleteRoom(roomId: string, creatorEmail: string) {
    try {
      const docRef = firestoreDB.collection("rooms").doc(roomId);
      const doc = await docRef.get();

      if (!doc.exists) return { error: "Room not found" };

      const data = doc.data()!;

      if (data.createdBy !== creatorEmail) {
        return { error: "Not authorized to delete this room" };
      }

      // Borrar de ambas bases de datos en paralelo
      await Promise.all([
        docRef.delete(),
        realtimeDB.ref(`rooms/${data.roomId}`).remove(),
      ]);

      return { ok: true };
    } catch (error) {
      console.error("[RoomModel] deleteRoom:", error);
      return { error: "Error al eliminar la sala" };
    }
  }
}

export default RoomModel;
