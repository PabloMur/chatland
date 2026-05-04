"use client";
import { useUIStore } from "@/lib/stores/uiStore";

const Burger = () => {
  const menuActive = useUIStore((s) => s.menuActive);
  const setMenuActive = useUIStore((s) => s.setMenuActive);
  return (
    <button
      onClick={() => setMenuActive(!menuActive)}
      className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-all duration-200"
      style={{
        background: menuActive ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span className="w-4 h-0.5 rounded-full transition-all duration-300" style={{ background: menuActive ? "#a855f7" : "rgba(255,255,255,0.7)", transform: menuActive ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
      <span className="w-4 h-0.5 rounded-full transition-all duration-300" style={{ background: menuActive ? "#a855f7" : "rgba(255,255,255,0.7)", opacity: menuActive ? 0 : 1 }} />
      <span className="w-4 h-0.5 rounded-full transition-all duration-300" style={{ background: menuActive ? "#a855f7" : "rgba(255,255,255,0.7)", transform: menuActive ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
    </button>
  );
};
export default Burger;
