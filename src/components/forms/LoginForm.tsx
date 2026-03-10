"use client";
import FormInput from "../ui/FormInput";
import { useCheckEmail, useGoTo } from "@/lib/hooks";
import { useUserStore } from "@/lib/stores/userStore";
import { useUIStore } from "@/lib/stores/uiStore";
import { motion } from "framer-motion";

const LoginForm = () => {
  const userEmail = useUserStore((s) => s.userEmail);
  const setUserEmail = useUserStore((s) => s.setUserEmail);
  const setLoader = useUIStore((s) => s.setLoader);
  const checkEmail = useCheckEmail();
  const goTo = useGoTo();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const emailExists = await checkEmail(userEmail);
    if (emailExists.checkEmail) {
      goTo("/password");
    } else {
      goTo("/signup");
    }
    setLoader(false);
  };

  return (
    <div className="w-full sm:w-1/2 min-h-screen flex flex-col items-center justify-center z-10 px-6 sm:px-16">
      <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)", color: "#a855f7" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Bienvenido de vuelta
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#f4f4f8" }}>Inicia Sesión</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Ingresa tu email para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput title="Email" type="email" name="email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} placeholder="tu@email.com" />
          <button type="submit" className="btn-primary">Continuar</button>
        </form>
        <p className="mt-6 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Si no tenés cuenta, serás redirigido al registro</p>
      </motion.div>
    </div>
  );
};
export default LoginForm;
