"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("/api/auth/forgot-password", { email });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0a0a0f" }}>
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {status === "sent" ? (
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#f4f4f8" }}>Revisá tu email</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Si existe una cuenta con ese email, vas a recibir un link para restablecer tu contraseña. Expira en 1 hora.
            </p>
            <Link href="/login" className="text-sm" style={{ color: "#a855f7" }}>
              ← Volver al login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#f4f4f8" }}>Olvidé mi contraseña</h1>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Ingresá tu email y te mandamos un link para restablecer tu contraseña.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="form-input"
                />
              </div>

              {status === "error" && (
                <p className="text-sm px-3 py-2 rounded-lg" style={{ color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  Ocurrió un error. Intentá de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary"
              >
                {status === "loading" ? "Enviando..." : "Enviar link"}
              </button>
            </form>

            <Link
              href="/password"
              className="mt-4 block text-center text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              ← Volver
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
