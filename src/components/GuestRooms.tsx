"use client";
import { useMyGuestRoomsIDs } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/userStore";
import RoomIdDisplay from "./ui/Buttons/MyRoomButton";

const GuestRooms = () => {
  const getMyRooms = useMyGuestRoomsIDs();
  const guestRooms = useUserStore((s) => s.userGuestRooms);
  const setGuestRooms = useUserStore((s) => s.setUserGuestRooms);

  const handleGetRooms = async () => {
    const rooms = await getMyRooms();
    setGuestRooms(rooms);
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  if (guestRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "rgba(34,211,238,0.06)", color: "rgba(34,211,238,0.4)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          No fuiste invitado a ninguna sala
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 py-3">
      {guestRooms.map((roomID: string, index: number) => (
        <motion.div
          key={roomID}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
        >
          <RoomIdDisplay roomId={roomID} />
        </motion.div>
      ))}
    </div>
  );
};
export default GuestRooms;
