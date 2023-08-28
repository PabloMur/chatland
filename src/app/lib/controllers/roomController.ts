import { headers } from "next/headers";
import CreateChatroomModel from "../models/ChatroomModel";
import ChatroomModel from "../models/RoomModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { StructuredType } from "typescript";

class roomController {
  static async createChatroom(request: Request) {
    const headersList = headers();
    const authorizationRef = headersList.get("authorization");
    if (!authorizationRef) {
      return { error: "Missing authorization token" };
    }
    const token = authorizationRef?.replace("Bearer ", "");
    if (!token) {
      return { error: "Missing authorization token" };
    }

    try {
      const roomId = await CreateChatroomModel.createChatroom(token);
      return roomId;
    } catch (error) {
      return { error };
    }
  }

  static async deleteRoom(request: NextRequest, roomId: string) {
    const headersList = headers();
    const authorizationRef = headersList.get("authorization");
    if (!authorizationRef) {
      return { error: "Missing authorization token" };
    }
    const token = authorizationRef?.replace("Bearer ", "");
    if (!token) {
      return { error: "Missing authorization token" };
    }
    const secret = process.env.SECRET_KEY as any;
    if (!token) {
      return NextResponse.json(
        { error: "Missing authorization token" },
        { status: 401 }
      );
    }

    try {
      const decodedToken = jwt.verify(token, secret);
      if (decodedToken) {
        const deletRoom = await ChatroomModel.deleteRoom(roomId);
        return { decodedToken, deletRoom };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 401 });
    }
  }
}

export default roomController;
