import { firestoreDB } from "@/lib/FirestoreConn";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthModel {
  static async createAuth(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const docRef = firestoreDB.collection("auth").doc();
    await docRef.set({
      email,
      password: hashedPassword,
    });
    return true;
  }
  static async deleteAuth(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("auth")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const userRef = querySnapshot.docs[0].ref;
        await userRef.delete();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
  static async createToken(email: string, password: string) {
    try {
      const secret = process.env.SECRET_KEY as string;
      const querySnapshot = await firestoreDB
        .collection("auth")
        .where("email", "==", email)
        .get();

      if (querySnapshot.empty) {
        return { error: "Invalid email or password" };
      }

      const doc = querySnapshot.docs[0];
      const savedPassword = doc.data().password;
      const passwordMatch = await bcrypt.compare(password, savedPassword);

      if (!passwordMatch) {
        return { error: "Invalid email or password" };
      }

      const token = jwt.sign({ email }, secret, { expiresIn: "7d" });
      return token;
    } catch (error) {
      console.error(error);
      return { error: "Method Not Allowed" };
    }
  }
}

export default AuthModel;
