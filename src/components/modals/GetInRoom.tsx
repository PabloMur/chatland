"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/stores/uiStore";
import GetInRoom from "../forms/GetInRoom";

const GetInRoomModal = () => {
  const modalActive = useUIStore((s) => s.getInRoomModal);
  const setModalActive = useUIStore((s) => s.setGetInRoomModal);
  const handleCloseModal = () => {
    setModalActive(false);
  };

  return (
    <AnimatePresence>
      {modalActive && (
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="relative w-full max-w-md mx-4 p-7 rounded-2xl"
            style={{
              background: "rgba(26,26,36,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee" }}
              >
                Unirse a sala
              </div>
              <h2 className="text-xl font-bold" style={{ color: "#f4f4f8" }}>
                Ingresá el código de sala
              </h2>
            </div>

            <GetInRoom />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GetInRoomModal;
