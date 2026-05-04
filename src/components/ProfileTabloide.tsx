"use client";
import { useUserStore } from "@/lib/stores/userStore";
import { motion } from "framer-motion";

const ProfileContent = () => {
  const userImage = useUserStore((s) => s.userImage);
  const userEmail = useUserStore((s) => s.userEmail);
  const userName = useUserStore((s) => s.userName);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* Header banner */}
          <div
            className="h-28 w-full relative"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.15))" }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(10,10,15,0.5))" }} />
          </div>

          {/* Avatar */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-12 mb-5">
              <div
                className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
                style={{
                  border: "3px solid #0a0a0f",
                  background: "rgba(168,85,247,0.15)",
                }}
              >
                {userImage ? (
                  <img src={userImage} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ color: "#a855f7" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: "#f4f4f8" }}>
                  {userName || "Usuario"}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {userEmail}
                </p>
              </div>

              <div
                className="h-px w-full"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.12)" }}
                >
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                  <p className="text-sm font-medium truncate" style={{ color: "#a855f7" }}>{userEmail || "-"}</p>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.1)" }}
                >
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Estado</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p className="text-sm font-medium" style={{ color: "#22d3ee" }}>Activo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileContent;
