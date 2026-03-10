import MessageContainer from "@/components/room/MessageContainer";

const RoomPage = () => {
  return (
    <div className="sm:pl-64 pt-16 sm:pt-0 h-screen flex flex-col" style={{ background: "#0a0a0f" }}>
      <MessageContainer />
    </div>
  );
};
export default RoomPage;
