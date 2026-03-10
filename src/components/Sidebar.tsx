"use client";
import { motion } from "framer-motion";
import MenuLi from "./ui/Buttons/MenuLi";
import CloseSessionButton from "./ui/Buttons/CloseSession";
import Logo from "./ui/Logo";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      route: "/home",
      text: "Home",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      route: "/my-rooms",
      text: "My Rooms",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      route: "/profile",
      text: "Profile",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ];

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className="hidden sm:flex flex-col h-screen w-64 fixed left-0 top-0 z-10"
      style={{
        background: "rgba(17,17,24,0.95)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Logo />
      </div>

      {/* Nav items */}
      <motion.nav
        className="flex-1 py-6 px-3"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <motion.div key={item.route} variants={itemVariants}>
              <MenuLi route={item.route} icon={item.icon} isActive={isActive}>
                {item.text}
              </MenuLi>
            </motion.div>
          );
        })}
      </motion.nav>

      {/* Bottom */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <CloseSessionButton />
      </div>
    </div>
  );
};

export default Sidebar;
