"use client";
import { useCreateRoom, useGetInRoom, useGoTo } from "@/lib/hooks";
import { useUserStore } from "@/lib/stores/userStore";
import { useRoomStore } from "@/lib/stores/roomStore";
import { useUIStore } from "@/lib/stores/uiStore";
import { motion } from "framer-motion";

const CreateIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="12" y1="8" x2="12" y2="14"/>
    <line x1="9" y1="11" x2="15" y2="11"/>
  </svg>
);

const JoinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <polyline points="17 8 21 12 17 16"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
  </svg>
);

const Options = () => {
  const createRoom = useCreateRoom();
  const userEmail = useUserStore((s) => s.userEmail);
  const userToken = useUserStore((s) => s.userToken);
  const isGuest = useUserStore((s) => s.isGuest);
  const modalSetter = useUIStore((s) => s.setGetInRoomModal);
  const setLoader = useUIStore((s) => s.setLoader);
  const roomCodeSetter = useRoomStore((s) => s.setRoomCode);
  const realtimeCodeSetter = useRoomStore((s) => s.setRealtimeCode);
  const modalNewRoomCreated = useUIStore((s) => s.setShareCodeModal);
  const getInRoom = useGetInRoom();
  const goTo = useGoTo();

  const handleCreateRoom = async () => {
    if (isGuest) {
      goTo("/signup");
      return;
    }
    setLoader(true);
    const roomCreated = await createRoom(userEmail, userToken);
    if (roomCreated) {
      roomCodeSetter(roomCreated);
      const realtimeCode = await getInRoom(roomCreated);
      realtimeCodeSetter(realtimeCode.roomId);
      modalNewRoomCreated(true);
      goTo(`/room/${roomCreated}`);
      setLoader(false);
    }
  };

  const handleGetInRoom = () => {
    modalSetter(true);
  };

  const options = [
    {
      icon: <CreateIcon />,
      title: "Crear sala",
      desc: "Iniciá una nueva conversación y compartí el código",
      onClick: handleCreateRoom,
      gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(124,58,237,0.1))",
      border: "rgba(168,85,247,0.25)",
      iconColor: "#a855f7",
      hoverBorder: "rgba(168,85,247,0.5)",
    },
    {
      icon: <JoinIcon />,
      title: "Unirse a sala",
      desc: "Ingresá con un código y conectate con alguien",
      onClick: handleGetInRoom,
      gradient: "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(8,145,178,0.08))",
      border: "rgba(34,211,238,0.2)",
      iconColor: "#22d3ee",
      hoverBorder: "rgba(34,211,238,0.45)",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Welcome text */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-3" style={{ color: "#f4f4f8" }}>
          ¿Qué querés hacer?
        </h2>
        <p className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
          Creá una nueva sala o unite a una existente
        </p>
      </motion.div>

      {/* Option cards */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-2xl">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={opt.onClick}
            className="flex-1 flex flex-col items-start p-7 rounded-2xl text-left transition-all duration-300 group"
            style={{
              background: opt.gradient,
              border: `1px solid ${opt.border}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = opt.hoverBorder;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${opt.border}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = opt.border;
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${opt.border}`,
                color: opt.iconColor,
              }}
            >
              {opt.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#f4f4f8" }}>
              {opt.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {opt.desc}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Options;
