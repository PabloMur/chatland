"use client";
import { motion } from "framer-motion";
import { userEmailAtom, userRoomsAtom } from "@/lib/atoms/atoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMyRoomsIDs } from "../lib/hooks";
import RoomIdDisplay from "./ui/Buttons/MyRoomButton";

const UserRooms = () => {
  const userEmail = useRecoilValue(userEmailAtom);
  const getMyRooms = useMyRoomsIDs();
  const [userRooms, setUserRooms] = useRecoilState(userRoomsAtom);

  const handleGetRooms = async () => {
    const rooms = await getMyRooms(userEmail);
    setUserRooms(rooms);
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  return (
    <motion.div
      className="h-fit w-full py-3 grid grid-cols-4 gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, staggerChildren: 0.1 }}
    >
      {userRooms.map((roomID: string, index: number) => (
        <motion.div
          key={roomID}
          className="grid-item"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <RoomIdDisplay roomId={roomID} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UserRooms;
