"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/stores/uiStore";

const Loader = () => {
  const loader = useUIStore((s) => s.loader);
  return (
    <AnimatePresence>
      {loader && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full"
              style={{ border: "2px solid rgba(168,85,247,0.15)", borderTopColor: "#a855f7" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-10 h-10 rounded-full"
              style={{ border: "2px solid rgba(34,211,238,0.15)", borderBottomColor: "#22d3ee" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            className="mt-5 text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.5)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Loader;
