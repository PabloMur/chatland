"use client";
import FormInput from "../ui/FormInput";
import { useGoTo } from "@/lib/hooks";
import { APIGetToken, APIGetUserMe } from "@/lib/APICalls";
import { useUserStore } from "@/lib/stores/userStore";
import { useUIStore } from "@/lib/stores/uiStore";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PasswordForm() {
  const email = useUserStore((s) => s.userEmail);
  const password = useUserStore((s) => s.userPassword);
  const setPassword = useUserStore((s) => s.setUserPassword);
  const setUserImage = useUserStore((s) => s.setUserImage);
  const setUserToken = useUserStore((s) => s.setUserToken);
  const setLoaderState = useUIStore((s) => s.setLoader);
  const goTo = useGoTo();
  const [error, setError] = useState("");

  const handleOnChage = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoaderState(true);
    const token = await APIGetToken(email, password);
    setLoaderState(false);
    if (token) {
      const userData = await APIGetUserMe(email, token);
      setUserToken(token);
      setUserImage(userData.userData.userImage);
      goTo("/home");
    } else {
      setError("Contraseña incorrecta. Intentá de nuevo.");
    }
  };

  return (
    <div className="w-full sm:w-1/2 min-h-screen flex flex-col items-center justify-center z-10 px-6 sm:px-16">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.2)",
              color: "#a855f7",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {email}
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#f4f4f8" }}>
            Tu contraseña
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Ingresá tu contraseña para acceder
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            title="Contraseña"
            type="password"
            name="password"
            onChange={handleOnChage}
            value={password}
            placeholder="Tu contraseña"
          />
          {error && (
            <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary">
            Ingresar
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-2">
          <button
            className="w-full text-center text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onClick={() => goTo("/login")}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            ← Cambiar email
          </button>
          <button
            className="w-full text-center text-sm transition-colors"
            style={{ color: "#a855f7" }}
            onClick={() => goTo("/forgot-password")}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Olvidé mi contraseña
          </button>
        </div>
      </motion.div>
    </div>
  );
}
