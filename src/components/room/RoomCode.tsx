"use client";
import { useState } from "react";
import { useUIStore } from "@/lib/stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";

const RoomCode = ({ roomCode }: any) => {
  const [menuActive, setMenuState] = useState(false);
  const shareCodeModalSetter = useUIStore((s) => s.setShareCodeModal);
  const deleteRoomModalSetter = useUIStore((s) => s.setDeleteRoomModal);

  const handleShareRoom = () => {
    shareCodeModalSetter(true);
    setMenuState(false);
  };
  const handleDeleteRoom = () => {
    deleteRoomModalSetter(true);
    setMenuState(false);
  };

  return (
    <div
      className="relative h-16 flex items-center justify-between px-5 flex-shrink-0"
      style={{
        background: "rgba(17,17,24,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Room info */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#f4f4f8" }}>
            Sala #{roomCode}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Chat en tiempo real
          </p>
        </div>
      </div>

      {/* Menu button */}
      <div className="relative">
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: menuActive ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: menuActive ? "#a855f7" : "rgba(255,255,255,0.5)",
          }}
          onClick={() => setMenuState(!menuActive)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>

        <AnimatePresence>
          {menuActive && (
            <motion.div
              className="absolute right-0 top-11 w-48 rounded-xl overflow-hidden z-30"
              style={{
                background: "rgba(26,26,36,0.97)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all duration-150"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={handleShareRoom}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Compartir código
              </button>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all duration-150"
                style={{ color: "#f87171" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={handleDeleteRoom}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
                Eliminar sala
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default RoomCode;
