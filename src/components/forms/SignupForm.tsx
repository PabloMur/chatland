"use client";
import FormInput from "../ui/FormInput";
import { useState } from "react";
import { useUserStore } from "@/lib/stores/userStore";
import { useUIStore } from "@/lib/stores/uiStore";
import { passwordsAreEqual } from "@/lib/tools";
import { useCreateUser, useGetToken, useGoTo } from "@/lib/hooks";
import { motion } from "framer-motion";

const SignupForm = () => {
  const userEmail = useUserStore((s) => s.userEmail);
  const setUserEmail = useUserStore((s) => s.setUserEmail);
  const setUserToken = useUserStore((s) => s.setUserToken);
  const setLoader = useUIStore((s) => s.setLoader);
  const [passOne, setPassOne] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [error, setError] = useState("");
  const userCreator = useCreateUser();
  const tokenGetter = useGetToken();
  const goTo = useGoTo();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoader(true);
    if (passwordsAreEqual(passOne, passTwo)) {
      const created = await userCreator(userEmail, passOne);
      if (created?.userCreated?.error) {
        setError(created.userCreated.error);
        setLoader(false);
        return;
      }
      const token = await tokenGetter(userEmail, passOne);
      if (!token) {
        setError("Error al iniciar sesión automáticamente");
        setLoader(false);
        return;
      }
      setUserToken(token);
      goTo("/home");
    } else {
      setError("Las contraseñas no coinciden");
      setLoader(false);
    }
  };

  return (
    <div className="w-full sm:w-1/2 min-h-screen flex flex-col items-center justify-center z-10 px-6 sm:px-16">
      <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            Nueva cuenta
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#f4f4f8" }}>Registrate</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Crea tu cuenta y empieza a chatear</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput title="Email" type="email" name="email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} placeholder="tu@email.com" />
          <FormInput title="Contraseña" type="password" name="pone" onChange={(e) => setPassOne(e.target.value)} value={passOne} placeholder="Mínimo 6 caracteres" />
          <FormInput title="Repetir contraseña" type="password" name="ptwo" onChange={(e) => setPassTwo(e.target.value)} value={passTwo} placeholder="Repetí tu contraseña" />
          {error && <p className="text-sm mb-3 px-3 py-2 rounded-lg" style={{ color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>{error}</p>}
          <button type="submit" className="btn-primary">Crear cuenta</button>
        </form>
      </motion.div>
    </div>
  );
};
export default SignupForm;
