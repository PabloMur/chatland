import { firestoreDB } from "@/lib/FirestoreConn";
import crypto from "crypto";
import admin from "firebase-admin";

class PasswordResetModel {
  static async createResetToken(email: string) {
    // Verificar que el usuario existe
    const userSnap = await firestoreDB
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnap.empty) return null;

    // Invalidar tokens anteriores del mismo email
    const existing = await firestoreDB
      .collection("password_resets")
      .where("email", "==", email)
      .where("used", "==", false)
      .get();

    for (const doc of existing.docs) {
      await doc.ref.update({ used: true });
    }

    // Crear nuevo token (expira en 1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 60 * 60 * 1000)
    );

    await firestoreDB.collection("password_resets").add({
      email,
      token,
      expiresAt,
      used: false,
    });

    return token;
  }

  static async resetPassword(token: string, newPassword: string) {
    const snap = await firestoreDB
      .collection("password_resets")
      .where("token", "==", token)
      .where("used", "==", false)
      .get();

    if (snap.empty) return { error: "Token inválido o ya utilizado" };

    const doc = snap.docs[0];
    const data = doc.data();

    if (data.expiresAt.toDate() < new Date()) {
      await doc.ref.update({ used: true });
      return { error: "El link expiró. Solicitá uno nuevo." };
    }

    // Actualizar contraseña en colección "auth"
    const bcrypt = (await import("bcryptjs")).default;
    const hashed = await bcrypt.hash(newPassword, 10);

    const authSnap = await firestoreDB
      .collection("auth")
      .where("email", "==", data.email)
      .get();

    if (authSnap.empty) return { error: "Usuario no encontrado" };

    await authSnap.docs[0].ref.update({ password: hashed });
    await doc.ref.update({ used: true });

    return { ok: true };
  }
}

export default PasswordResetModel;
