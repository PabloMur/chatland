"use client";
import { ReactNode } from "react";
import { useUserStore } from "@/lib/stores/userStore";
import { useGoTo } from "@/lib/hooks";

interface PageContainerProps {
  title?: string;
  children: ReactNode;
}

const PageContainer = ({ title, children }: PageContainerProps) => {
  const isGuest = useUserStore((s) => s.isGuest);
  const goTo = useGoTo();

  return (
    <div className="min-h-screen w-full flex flex-col sm:pl-64 pt-16 sm:pt-0" style={{ background: "#0a0a0f" }}>
      {isGuest && (
        <div
          className="flex items-center justify-between px-6 py-2 text-xs"
          style={{
            background: "rgba(168,85,247,0.08)",
            borderBottom: "1px solid rgba(168,85,247,0.2)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>Modo invitado · sesión de 30 min · solo podés unirte a salas</span>
          <button
            onClick={() => goTo("/signup")}
            className="font-medium transition-colors"
            style={{ color: "#a855f7" }}
          >
            Crear cuenta →
          </button>
        </div>
      )}
      {title && (
        <div
          className="px-8 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <h1 className="text-2xl font-bold" style={{ color: "#f4f4f8" }}>
            {title}
          </h1>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
export default PageContainer;
