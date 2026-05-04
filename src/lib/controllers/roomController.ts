import CreateChatroomModel from "../models/ChatroomModel";
import RoomModel from "../models/RoomModel";
import { verifyToken } from "@/lib/auth/verifyToken";
import { NextRequest } from "next/server";

class RoomController {
  static async createChatroom(request: Request) {
    try {
      const decoded = await verifyToken();
      // ChatroomModel necesita el token raw para verificarlo internamente
      const authorization = (request as any).headers.get("authorization") as string;
      const token = authorization.replace("Bearer ", "");
      const roomId = await CreateChatroomModel.createChatroom(token);
      return roomId;
    } catch (error) {
      return { error: "An error occurred" };
    }
  }

  static async deleteRoom(_request: NextRequest, roomId: string) {
    try {
      const decoded = await verifyToken();
      return await RoomModel.deleteRoom(roomId, decoded.email);
    } catch (error) {
      console.error("[RoomController] deleteRoom:", error);
      return { error: "Unauthorized" };
    }
  }
}

export default RoomController;
