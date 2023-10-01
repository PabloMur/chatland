"use client";
import { motion } from "framer-motion";
import TertiaryTitle from "../Titles/TertiaryTitle";
import { useGetInRoom, useGoTo } from "@/lib/hooks";
import { useSetRecoilState } from "recoil";
import { realtimeCodeAtom, roomCodeAtom } from "@/lib/atoms/atoms";
const RoomIdDisplay = ({ roomId }: any) => {
  const getInRoom = useGetInRoom();
  const roomCodeSetter = useSetRecoilState(roomCodeAtom);
  const realtimeCodeSetter = useSetRecoilState(realtimeCodeAtom);
  const goto = useGoTo();
  const handleClick = async () => {
    const realtimeCode = await getInRoom(roomId);
    roomCodeSetter(roomId);
    realtimeCodeSetter(realtimeCode.roomId);
    goto("/room/" + roomId);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4 bg-orange-50 rounded-xl shadow-sidebar h-fit w-full cursor-pointer grid place-items-center"
      onClick={handleClick}
    >
      <TertiaryTitle>{roomId}</TertiaryTitle>
    </motion.div>
  );
};
export default RoomIdDisplay;
