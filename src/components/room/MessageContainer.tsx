"use client";
import { useRecoilValue } from "recoil";
import {
  realtimeCodeAtom,
  roomCodeAtom,
  userEmailAtom,
} from "@/lib/atoms/atoms";
import RoomCode from "./RoomCode";
import MessageSender from "@/components/room/MessageSender";
import { onValue, ref, realtimeDataBase } from "@/lib/RealtimeConn";
import { useEffect, useRef, useState } from "react";
import Message from "../Message";

const MessageContainer = () => {
  const roomCode = useRecoilValue(roomCodeAtom);
  const realtimeCode = useRecoilValue(realtimeCodeAtom);
  const db = realtimeDataBase;
  const chatroomRef = ref(db, "rooms/" + realtimeCode + "/messages");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const email = useRecoilValue(userEmailAtom);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(data);
        console.log("Messages:", data);
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="h-screen w-full  flex flex-col">
      <RoomCode roomCode={roomCode}></RoomCode>
      <div className="h-full pt-2 overflow-y-scroll" ref={messagesContainerRef}>
        <ul>
          {messages.map((message: any) => {
            const messageText = message.message;
            return (
              <li key={Math.random()}>
                {message.from === email ? (
                  <Message
                    isOwner={true}
                    text={messageText}
                    isNew={message.isNew}
                  />
                ) : (
                  <Message
                    isOwner={false}
                    text={messageText}
                    isNew={message.isNew}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <MessageSender />
    </div>
  );
};
export default MessageContainer;
