"use client";
import { motion } from "framer-motion";
import { useGetInRoom, useGoTo } from "@/lib/hooks";
import { useRoomStore } from "@/lib/stores/roomStore";

const RoomIdDisplay = ({ roomId }: any) => {
  const getInRoom = useGetInRoom();
  const roomCodeSetter = useRoomStore((s) => s.setRoomCode);
  const realtimeCodeSetter = useRoomStore((s) => s.setRealtimeCode);
  const goto = useGoTo();

  const handleClick = async () => {
    const realtimeCode = await getInRoom(roomId);
    roomCodeSetter(roomId);
    realtimeCodeSetter(realtimeCode.roomId);
    goto("/room/" + roomId);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-4 rounded-xl text-left transition-all duration-200 group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
      }}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.8)" }}>
            Sala #{roomId}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            Click para entrar
          </p>
        </div>
        <svg
          className="flex-shrink-0 transition-transform group-hover:translate-x-1"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </motion.button>
  );
};
export default RoomIdDisplay;
