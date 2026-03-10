"use client";
import { useUIStore } from "@/lib/stores/uiStore";
import Link from "next/link";

interface MenuLiProps {
  children: React.ReactNode;
  route: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

const MenuLi = ({ children, route, icon, isActive }: MenuLiProps) => {
  const setMenuActive = useUIStore((s) => s.setMenuActive);
  return (
    <Link
      onClick={() => setMenuActive(false)}
      href={route}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group"
      style={{
        background: isActive ? "rgba(168,85,247,0.15)" : "transparent",
        color: isActive ? "#a855f7" : "rgba(255,255,255,0.55)",
        border: isActive ? "1px solid rgba(168,85,247,0.2)" : "1px solid transparent",
      }}
      onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; } }}
      onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; } }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="text-sm font-medium">{children}</span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#a855f7" }} />}
    </Link>
  );
};
export default MenuLi;
