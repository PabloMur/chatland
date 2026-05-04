"use client";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/lib/stores/uiStore";

const Logo = () => {
  const router = useRouter();
  const setMenuActive = useUIStore((s) => s.setMenuActive);
  const handleClick = () => {
    setMenuActive(false);
    router.push("/home");
  };
  return (
    <button type="button" onClick={handleClick} className="flex items-center gap-2 group">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight" style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        Chatland
      </span>
    </button>
  );
};
export default Logo;
