"use client";
import { useUserStore } from "@/lib/stores/userStore";
import { useRoomStore } from "@/lib/stores/roomStore";
import RoomCode from "./RoomCode";
import MessageSender from "@/components/room/MessageSender";
import { onValue, ref, realtimeDataBase } from "@/lib/RealtimeConn";
import { useEffect, useRef, useState } from "react";
import Message from "../Message";
import ShareCodeModal from "../modals/ShareCodeModal";
import DeleteRoomModal from "../modals/DeleteRoomModal";

const MessageContainer = () => {
  const roomCode = useRoomStore((s) => s.roomCode);
  const realtimeCode = useRoomStore((s) => s.realtimeCode);
  const db = realtimeDataBase;
  const chatroomRef = ref(db, "rooms/" + realtimeCode + "/messages");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const email = useUserStore((s) => s.userEmail);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(data);
      }
    });
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen" style={{ background: "#0a0a0f" }}>
      <RoomCode roomCode={roomCode} />

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto py-4 relative"
        ref={messagesContainerRef}
      >
        <ShareCodeModal />
        <DeleteRoomModal />

        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.08)", color: "rgba(168,85,247,0.4)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              No hay mensajes aún. ¡Empezá la conversación!
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {messages.map((message: any, idx: number) => (
              <li key={idx}>
                <Message
                  isOwner={message.from === email}
                  text={message.message}
                  isNew={message.isNew}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <MessageSender />
    </div>
  );
};
export default MessageContainer;
