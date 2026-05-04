"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMyRoomsIDs } from "../lib/hooks";
import { useUserStore } from "@/lib/stores/userStore";
import RoomIdDisplay from "./ui/Buttons/MyRoomButton";

const UserRooms = () => {
  const getMyRooms = useMyRoomsIDs();
  const userRooms = useUserStore((s) => s.userRooms);
  const setUserRooms = useUserStore((s) => s.setUserRooms);

  const handleGetRooms = async () => {
    const rooms = await getMyRooms();
    setUserRooms(rooms);
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  if (userRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "rgba(168,85,247,0.08)", color: "rgba(168,85,247,0.5)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="12" y1="8" x2="12" y2="14"/>
            <line x1="9" y1="11" x2="15" y2="11"/>
          </svg>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          No tenés salas propias aún
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 py-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {userRooms.map((roomID: string, index: number) => (
        <motion.div
          key={roomID}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
        >
          <RoomIdDisplay roomId={roomID} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UserRooms;
