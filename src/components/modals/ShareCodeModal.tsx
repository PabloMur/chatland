"use client";
import { roomCodeAtom } from "@/lib/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import cross from "../../../public/img/cross-circle-svgrepo-com.svg";
import TertiaryTitle from "../ui/Titles/TertiaryTitle";
import { shareCodeMedalAtom } from "@/lib/atoms/uiAtoms";
export default function ShareCodeModal() {
  const roomCode = useRecoilValue(roomCodeAtom);
  const [modalActive, setModalState] = useRecoilState(shareCodeMedalAtom);
  const handleCloseModal = () => {
    setModalState(false);
  };
  return (
    modalActive && (
      <div className="bg-indigo-900/50 h-full w-full absolute grid place-items-center">
        <div className="bg-orange-50 rounded-xl p-3 pb-6 h-40 w-2/4">
          <div className="flex justify-end">
            <Image
              alt="imagen de cruz para cerrar un modal"
              src={cross}
              width={25}
              onClick={handleCloseModal}
              className="cursor-pointer"
            ></Image>
          </div>
          <div className="text-indigo-900 h-5/6 grid place-items-center">
            <TertiaryTitle>Comparte este codigo:</TertiaryTitle>
            <p className="text-3xl font-bold">{roomCode}</p>
            <TertiaryTitle>con la persona que quieres hablar.</TertiaryTitle>
          </div>
        </div>
      </div>
    )
  );
}
