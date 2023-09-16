"use client";
import { useRecoilValue } from "recoil";
import { roomCodeAtom } from "@/lib/atoms/atoms";
import RoomCode from "./RoomCode";
import MessageSender from "@/components/room/MessageSender";

const MessageContainer = () => {
  const roomCode = useRecoilValue(roomCodeAtom);

  return (
    <div className="h-screen w-full  flex flex-col">
      <RoomCode roomCode={roomCode}></RoomCode>
      <div className="h-full  overflow-y-scroll"></div>
      <MessageSender />
    </div>
  );
};
export default MessageContainer;
