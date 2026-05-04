import AuthModel from "@/lib/models/AuthModel";
import { verifyToken } from "@/lib/auth/verifyToken";
import { NextRequest } from "next/server";

class AuthController {
  static async createAuth(req: NextRequest) {
    try {
      const { email, password } = await req.json();
      return await AuthModel.createAuth(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteAuth() {
    try {
      const decoded = await verifyToken();
      return await AuthModel.deleteAuth(decoded.email);
    } catch (error) {
      return { error: "An error occurred" };
    }
  }

  static async retriveToken(req: NextRequest) {
    try {
      const { email, password } = await req.json();
      const tokenCreated = await AuthModel.createToken(email, password);
      return tokenCreated ? tokenCreated : null;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthController;
