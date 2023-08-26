"use client";
import { menuActive } from "@/atoms/uiAtoms";
import { useRecoilValue } from "recoil";
import MenuLi from "./ui/Buttons/MenuLi";
const Menu = () => {
  const active = useRecoilValue(menuActive);
  return (
    active && (
      <div className="h-5/6 w-full absolute top-20 left-0 bg-indigo-900 flex flex-col items-center justify-between">
        <ul className="h-4/5">
          <MenuLi route="/home">Home</MenuLi>
          <MenuLi route="/myRooms">My Rooms</MenuLi>
          <MenuLi route="/profile">Profile</MenuLi>
          <MenuLi route="/settings">Settins</MenuLi>
        </ul>
        <button>Salir</button>
      </div>
    )
  );
};
export default Menu;
