import { firestoreDB } from "@/lib/FirestoreConn";
import { cloudinary } from "@/lib/CloudinaryConn";
import bcrypt from "bcrypt";
class UserModel {
  static async createMe(email: string, password: string) {
    try {
      type User = {
        name: string;
        email: string;
        userImage: string;
      };

      // Verificar si el usuario ya existe en la colección "users"
      const snapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!snapshot.empty) return { error: "El usuario ya existe" };

      // Crear un nuevo documento de usuario
      const newUser: User = {
        name: "User",
        email,
        userImage:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      };

      const userRef = await firestoreDB.collection("users").add(newUser);

      // Hash de la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo documento en la colección "auth"
      const authRef = await firestoreDB.collection("auth").doc(userRef.id);
      await authRef.set({
        email,
        password: hashedPassword,
      });

      const createdUser = {
        ...newUser,
        id: userRef.id,
      };

      return createdUser;
    } catch (error) {
      console.error(error);
    }
  }
  static async getMe(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return null;
    }
  }
  static async updateMe(email: string, data: any) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!querySnapshot.empty) {
        const userRef = querySnapshot.docs[0].ref;
        const currentUserData = (await userRef.get()).data();
        if (data.userImage) {
          const parsedImage = await cloudinary.uploader.upload(data.userImage);
          console.log("tiene imagen para editar");
          console.log(data.userImage);
          data.userImage = parsedImage.secure_url;
          console.log(data.userImage);
        }
        const updatedData = { ...currentUserData, ...data };
        await userRef.update(updatedData);
        return updatedData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      return null;
    }
  }
  static async deleteMe(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
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

  static async checkEmail(email: string) {
    try {
      const querySnapshot = await firestoreDB
        .collection("users")
        .where("email", "==", email)
        .get();

      const exists = !querySnapshot.empty;
      return exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  }
}

export { UserModel };
