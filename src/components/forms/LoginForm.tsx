"use client";
import FormInput from "../ui/FormInput";
import { useCheckEmail, useGoTo } from "@/lib/hooks";
import { useUserStore } from "@/lib/stores/userStore";
import { useUIStore } from "@/lib/stores/uiStore";
import { APIGetDemoAccess, APIGetGuestToken } from "@/lib/APICalls";
import { APISetImGuest } from "@/lib/APICalls";
import { useRoomStore } from "@/lib/stores/roomStore";
import { motion } from "framer-motion";

const LoginForm = () => {
  const userEmail = useUserStore((s) => s.userEmail);
  const setUserEmail = useUserStore((s) => s.setUserEmail);
  const setUserToken = useUserStore((s) => s.setUserToken);
  const setUserName = useUserStore((s) => s.setUserName);
  const setIsGuest = useUserStore((s) => s.setIsGuest);
  const setLoader = useUIStore((s) => s.setLoader);
  const setRoomCode = useRoomStore((s) => s.setRoomCode);
  const setRealtimeCode = useRoomStore((s) => s.setRealtimeCode);
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

  const handleDemoLogin = async () => {
    setLoader(true);
    const data = await APIGetDemoAccess();
    if (data?.token) {
      setUserToken(data.token);
      setUserEmail(data.email);
      setUserName(data.name);
      setIsGuest(true);
      setRoomCode(data.roomId);
      setRealtimeCode(data.chatroomID);
      goTo(`/room/${data.roomId}`);
    }
    setLoader(false);
  };

  const handleGuestLogin = async () => {
    setLoader(true);
    const data = await APIGetGuestToken();
    if (data?.token) {
      setUserToken(data.token);
      setUserEmail(data.email);
      setUserName(data.name);
      setIsGuest(true);
      goTo("/home");
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

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>o</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Demo CTA */}
        <motion.button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.15))",
            border: "1px solid rgba(168,85,247,0.35)",
            color: "#c084fc",
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.6)";
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(168,85,247,0.28), rgba(124,58,237,0.22))";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.35)";
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(124,58,237,0.15))";
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Ver Demo
          </span>
          <span className="block text-xs font-normal mt-0.5" style={{ color: "rgba(192,132,252,0.6)" }}>
            Entrá a una sala de prueba · sin registro
          </span>
        </motion.button>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full mt-3 py-2.5 rounded-xl text-xs transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.35)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
          }}
        >
          Explorar sin sala de demo
        </button>

        <p className="mt-5 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Si no tenés cuenta, serás redirigido al registro</p>
      </motion.div>
    </div>
  );
};
export default LoginForm;
