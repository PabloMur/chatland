"use client";
import { motion } from "framer-motion";
import MenuLi from "./ui/Buttons/MenuLi";
import CloseSessionButton from "./ui/Buttons/CloseSession";
import Logo from "./ui/Logo";

const Sidebar = () => {
  const menuItems = [
    { route: "/home", text: "Home" },
    { route: "/my-rooms", text: "My Rooms" },
    { route: "/profile", text: "Profile" },
    { route: "/settings", text: "Settings" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="hidden none h-screen w-1/4 bg-orange-50 sm:flex flex-col items-center justify-between shadow-sidebar border-r-2">
      <Logo />
      <motion.ul
        className="h-auto w-full"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item, index) => (
          <motion.li key={index} variants={menuItemVariants}>
            <MenuLi route={item.route}>{item.text}</MenuLi>
          </motion.li>
        ))}
      </motion.ul>
      <CloseSessionButton />
    </div>
  );
};

export default Sidebar;
