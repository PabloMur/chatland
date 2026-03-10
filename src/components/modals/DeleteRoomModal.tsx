"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/stores/uiStore";
import { useDeleteRoom } from "@/lib/hooks";

const DeleteRoomModal = () => {
  const modalActive = useUIStore((s) => s.deleteRoomModal);
  const setModalActive = useUIStore((s) => s.setDeleteRoomModal);
  const deleteRoom = useDeleteRoom();

  const handleCloseModal = () => setModalActive(false);
  const handleDeleteRoom = async () => {
    await deleteRoom();
    setModalActive(false);
  };

  return (
    <AnimatePresence>
      {modalActive && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="relative w-full max-w-sm mx-4 p-7 rounded-2xl"
            style={{
              background: "rgba(26,26,36,0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>

            <h2 className="text-xl font-bold mb-2" style={{ color: "#f4f4f8" }}>
              Eliminar sala
            </h2>
            <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>
              Esta acción es permanente. Todos los mensajes serán eliminados y los participantes perderán acceso.
            </p>

            <div className="flex flex-col gap-3">
              <button className="btn-danger" onClick={handleDeleteRoom}>
                Sí, eliminar sala
              </button>
              <button className="btn-ghost" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteRoomModal;
