"use client";
import { motion } from "framer-motion";

const SecondaryTitle = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="box"
    >
      <h3 className="text-green-600 text-5xl m-5 font-extrabold">{children}</h3>
    </motion.div>
  );
};
export default SecondaryTitle;
