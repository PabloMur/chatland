"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const CustomImageBanner = ({ imageUrl, imageAlt }: any) => {
  const root = "/";
  const inRoot = usePathname() === root;

  const containerClass = inRoot
    ? "w-full sm:w-1/2 h-screen flex items-center justify-center"
    : "hidden sm:flex w-1/2 h-screen items-center justify-center";

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={containerClass}
      style={{ position: "relative" }}
    >
      {/* Glow behind image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(168,85,247,0.1) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-4/5 h-4/5 rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <Image
          className="object-cover"
          src={imageUrl}
          alt={imageAlt}
          fill
          style={{ opacity: 0.7 }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(34,211,238,0.1) 100%)" }}
        />
      </div>
    </motion.div>
  );
};

export default CustomImageBanner;
