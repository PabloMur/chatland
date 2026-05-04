"use client";
import { motion } from "framer-motion";

const SecondaryTitle = ({ children }: any) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-3xl font-bold tracking-tight"
      style={{ color: "#f4f4f8" }}
    >
      {children}
    </motion.h2>
  );
};
export default SecondaryTitle;
