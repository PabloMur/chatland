import { UserModel } from "../models/UserModel";
import { verifyToken } from "@/lib/auth/verifyToken";
import { NextRequest } from "next/server";

class UserController {
  static async createUser(request: NextRequest) {
    try {
      const { email, password } = await request.json();
      return await UserModel.createMe(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  static async getUserData(req: NextRequest) {
    try {
      const decoded = await verifyToken();
      const { email } = await req.json();

      if (decoded.email !== email) return { error: "Invalid email in token" };

      return await UserModel.getMe(email);
    } catch (error) {
      console.error(error);
      return { error: "An error occurred" };
    }
  }

  static async updateUserData(request: NextRequest) {
    try {
      const decoded = await verifyToken();
      const { newData, email } = await request.json();

      if (decoded.email !== email) return { error: "Invalid email in token" };

      await UserModel.updateMe(decoded.email, newData);
      return true;
    } catch (error) {
      console.error(error);
      return { error: "An error occurred" };
    }
  }

  static async deleteAccount() {
    try {
      const decoded = await verifyToken();
      return await UserModel.deleteMe(decoded.email);
    } catch (error) {
      return { error: "An error occurred" };
    }
  }

  static async checkEmail(email: string) {
    try {
      return await UserModel.checkEmail(email);
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserController;
