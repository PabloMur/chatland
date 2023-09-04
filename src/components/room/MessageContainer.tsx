import RoomCode from "./RoomCode";
import MessageSender from "@/components/room/MessageSender";
const MessageContainer = () => {
  return (
    <div className="h-screen w-full  flex flex-col">
      <RoomCode></RoomCode>
      <div className="h-full  overflow-y-scroll"></div>
      <MessageSender />
    </div>
  );
};
export default MessageContainer;
