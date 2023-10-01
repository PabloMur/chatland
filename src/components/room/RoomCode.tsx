import TertiaryTitle from "@/components/ui/Titles/TertiaryTitle";
const RoomCode = ({ roomCode }: any) => {
  return (
    <div className="h-20 w-full bg-orange-50 grid place-items-center">
      <TertiaryTitle>Room: {roomCode}</TertiaryTitle>
    </div>
  );
};
export default RoomCode;
