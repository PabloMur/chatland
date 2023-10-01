"use client";
import FormInput from "../ui/FormInput";
import TertiaryTitle from "../ui/Titles/TertiaryTitle";
import plane from "../../../public/img/plane.svg";
import Image from "next/image";
import { useSendMessage } from "@/lib/hooks";
import { useRecoilValue } from "recoil";
import {
  realtimeCodeAtom,
  userEmailAtom,
  userTokenAtom,
} from "@/lib/atoms/atoms";

const MessageSender = () => {
  const sendMessage = useSendMessage();
  const token = useRecoilValue(userTokenAtom);
  const email = useRecoilValue(userEmailAtom);
  const realtimeCode = useRecoilValue(realtimeCodeAtom);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const message = {
      roomId: realtimeCode,
      from: email,
      message: e.target.message.value,
    };
    await sendMessage(message, token);
    e.target.message.value = "";
  };
  return (
    <div className="h-24 grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="h-full flex w-full items-center justify-center bg-indigo-900/20 gap-2"
      >
        <div className="w-3/4">
          <FormInput name="message" type="text" />
        </div>
        <button className="w-1/6 h-10 bg-orange-50 flex justify-center items-center rounded-lg">
          <TertiaryTitle>Enviar</TertiaryTitle>
          <Image src={plane} alt="send message icon image" width={20}></Image>
        </button>
      </form>
    </div>
  );
};
export default MessageSender;
