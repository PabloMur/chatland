"use client";
import Image from "next/image";
import dotsmenu from "../../../public/img/threedots.svg";
import { deleteRoomAtom, shareCodeMedalAtom } from "@/lib/atoms/uiAtoms";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
const RoomCode = ({ roomCode }: any) => {
  const [menuActive, setMenuState] = useState(false);
  const shareCodeModalSetter = useSetRecoilState(shareCodeMedalAtom);
  const deleteRoomModalSetter = useSetRecoilState(deleteRoomAtom);
  const handleRoomMenuState = () => {
    setMenuState(!menuActive);
  };

  const handleShareRoom = () => {
    shareCodeModalSetter(true);
    handleRoomMenuState();
  };
  const handleDeleteRoom = () => {
    deleteRoomModalSetter(true);
    handleRoomMenuState();
  };

  return (
    <div className="relative h-20 w-full bg-orange-50 flex items-center justify-between px-6 z-20">
      <h3 className="text-indigo-900 font-bold text-xl">Room: {roomCode}</h3>
      <div
        className="rounded-full cursor-pointer hover:bg-indigo-200 p-2"
        onClick={handleRoomMenuState}
      >
        <Image
          src={dotsmenu}
          alt="imagen de tres puntos en representacion del un menu desplegable"
          height={23}
        />
      </div>
      {menuActive && (
        <menu className="bg-indigo-100 absolute h-fit w-1/4 right-4  top-[3.8rem] z-10 rounded-bl-xl overflow-hidden">
          <ul>
            <li
              className="text-indigo-900 p-4 bg-orange-50 grid place-items-center hover:bg-indigo-200 cursor-pointer"
              onClick={handleDeleteRoom}
            >
              Delete Room
            </li>
            <li
              className="text-indigo-900 p-4 bg-orange-50 grid place-items-center hover:bg-indigo-200 cursor-pointer"
              onClick={handleShareRoom}
            >
              Share Room
            </li>
          </ul>
        </menu>
      )}
    </div>
  );
};
export default RoomCode;
