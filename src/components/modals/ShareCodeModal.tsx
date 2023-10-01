"use client";
import { roomCodeAtom } from "@/lib/atoms/atoms";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import cross from "../../../public/img/cross-circle-svgrepo-com.svg";
export default function ShareCodeModal() {
  const roomCode = useRecoilValue(roomCodeAtom);
  return (
    <div>
      <div>
        <div>
          <Image alt="imagen de cruz para cerrar un modal" src={cross}></Image>
        </div>
        <div>
          Comparte este codigo: ${roomCode} con la persona que quieres hablar.
        </div>
      </div>
    </div>
  );
}
