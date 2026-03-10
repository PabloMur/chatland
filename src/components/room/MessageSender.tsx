"use client";
import { useSendMessage } from "@/lib/hooks";
import { useUserStore } from "@/lib/stores/userStore";
import { useRoomStore } from "@/lib/stores/roomStore";
import { useState } from "react";

const MessageSender = () => {
  const sendMessage = useSendMessage();
  const token = useUserStore((s) => s.userToken);
  const email = useUserStore((s) => s.userEmail);
  const realtimeCode = useRoomStore((s) => s.realtimeCode);
  const [value, setValue] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!value.trim()) return;
    const message = {
      roomId: realtimeCode,
      from: email,
      message: value.trim(),
    };
    await sendMessage(message, token);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div
      className="flex-shrink-0 px-4 py-4"
      style={{
        background: "rgba(17,17,24,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="text"
          name="message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribí un mensaje..."
          className="form-input flex-1"
          style={{ height: "44px" }}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: value.trim() ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.05)",
            color: value.trim() ? "white" : "rgba(255,255,255,0.2)",
            boxShadow: value.trim() ? "0 0 16px rgba(168,85,247,0.3)" : "none",
            cursor: value.trim() ? "pointer" : "not-allowed",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
    </div>
  );
};
export default MessageSender;
