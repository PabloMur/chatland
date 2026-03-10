"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/stores/uiStore";
import MenuLi from "./ui/Buttons/MenuLi";
import CloseSessionButton from "./ui/Buttons/CloseSession";
import { usePathname } from "next/navigation";

const Menu = () => {
  const active = useUIStore((s) => s.menuActive);
  const pathname = usePathname();

  const menuItems = [
    { route: "/home", text: "Home", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>) },
    { route: "/my-rooms", text: "My Rooms", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>) },
    { route: "/profile", text: "Profile", icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>) },
  ];

  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.div className="fixed inset-0 z-30 sm:hidden" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="fixed left-0 top-0 h-full w-72 z-40 flex flex-col sm:hidden" style={{ background: "rgba(17,17,24,0.98)", backdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,0.08)" }} initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}>
            <div className="h-16" />
            <nav className="flex-1 py-6 px-3">
              {menuItems.map((item) => (
                <MenuLi key={item.route} route={item.route} icon={item.icon} isActive={pathname === item.route}>{item.text}</MenuLi>
              ))}
            </nav>
            <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <CloseSessionButton />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default Menu;
