"use client";
import { userGuestRoomsAtom } from "@/lib/atoms/atoms";
import { useMyGuestRoomsIDs } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import RoomIdDisplay from "./ui/Buttons/MyRoomButton";

const GuestRooms = () => {
  const getMyRooms = useMyGuestRoomsIDs();
  const [guestRooms, setGuestRooms] = useRecoilState(userGuestRoomsAtom);

  const handleGetRooms = async () => {
    const rooms = await getMyRooms();
    setGuestRooms(rooms);
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  return (
    <div className="h-fit w-full py-3 grid grid-cols-4 gap-2">
      {guestRooms.map((roomID: string, index: number) => (
        <motion.div
          key={roomID}
          className="grid-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <RoomIdDisplay roomId={roomID} />
        </motion.div>
      ))}
    </div>
  );
};
export default GuestRooms;
