"use client";
import { motion } from "framer-motion";
import TertiaryTitle from "../Titles/TertiaryTitle";
const RoomIdDisplay = ({ roomId }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4 bg-orange-50 rounded-xl shadow-sidebar h-fit w-full cursor-pointer grid place-items-center"
    >
      <TertiaryTitle>{roomId}</TertiaryTitle>
    </motion.div>
  );
};
export default RoomIdDisplay;
