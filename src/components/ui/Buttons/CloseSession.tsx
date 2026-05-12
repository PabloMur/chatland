"use client";
import { useRouter } from "next/navigation";
import { APILogout } from "@/lib/APICalls";
import { useUserStore } from "@/lib/stores/userStore";

const CloseSessionButton = () => {
  const router = useRouter();
  const setUserToken = useUserStore((s) => s.setUserToken);
  const setUserEmail = useUserStore((s) => s.setUserEmail);
  const setIsGuest = useUserStore((s) => s.setIsGuest);

  const handleClick = async () => {
    await APILogout();
    setUserToken("");
    setUserEmail("");
    setIsGuest(false);
    router.push("/login");
  };

  return (
    <button
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
      style={{
        color: "rgba(239,68,68,0.7)",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
        (e.currentTarget as HTMLElement).style.color = "#ef4444";
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(239,68,68,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "rgba(239,68,68,0.7)";
        (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
      }}
      onClick={handleClick}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      <span className="text-sm font-medium">Cerrar Sesión</span>
    </button>
  );
};
export default CloseSessionButton;
