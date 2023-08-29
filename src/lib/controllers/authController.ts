import AuthModel from "@/lib/models/AuthModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

class AuthController {
  static async createAuth(req: NextRequest) {
    try {
      const { email, password } = await req.json();
      const created = await AuthModel.createAuth(email, password);
      return created;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteAuth(req: NextRequest) {
    try {
      const headersList = headers();
      const authorizationRef = headersList.get("authorization");
      if (!authorizationRef) {
        return { error: "Missing authorization token" };
      }

      const token = authorizationRef.replace("Bearer ", "");
      const secret = process.env.SECRET_KEY as string;
      const decodedToken = jwt.verify(token, secret) as any;

      if (!decodedToken.email) {
        return { error: "Invalid email in token" };
      }

      const authDeleted = await AuthModel.deleteAuth(decodedToken.email);
      return authDeleted;
    } catch (error) {
      return { error: "An error occurred" };
    }
  }
  static async retriveToken(req: NextRequest) {
    try {
      const { email, password } = await req.json();
      const tokenCreated = await AuthModel.creatToken(email, password);
      return tokenCreated ? tokenCreated : null;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthController;
