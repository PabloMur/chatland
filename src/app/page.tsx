"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background glow effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span
          className="text-3xl font-bold"
          style={{
            background: "linear-gradient(135deg, #a855f7, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Chatland
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        className="max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{
            background: "rgba(168,85,247,0.1)",
            border: "1px solid rgba(168,85,247,0.2)",
            color: "#a855f7",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Chat en tiempo real
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-5" style={{ color: "#f4f4f8" }}>
          Conectate al instante.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sin complicaciones.
          </span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Creá una sala de chat privada o unite a la de otro con un simple código.
          Conversaciones instantáneas, sin registro complicado.
        </p>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/login"
          className="flex-1 py-3.5 rounded-xl font-semibold text-center text-white transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #a855f7, #7c3aed)",
            boxShadow: "0 0 24px rgba(168,85,247,0.3)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(168,85,247,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(168,85,247,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
        >
          Empezar ahora
        </Link>
        <Link
          href="/login"
          className="flex-1 py-3.5 rounded-xl font-medium text-center transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "#f4f4f8"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
        >
          Iniciar sesión
        </Link>
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-3 gap-6 mt-16 max-w-lg w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {[
          { label: "Tiempo real", icon: "⚡" },
          { label: "Sin instalación", icon: "🚀" },
          { label: "100% privado", icon: "🔒" },
        ].map((feat) => (
          <div
            key={feat.label}
            className="flex flex-col items-center gap-2 p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <span className="text-2xl">{feat.icon}</span>
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              {feat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </main>
  );
}
