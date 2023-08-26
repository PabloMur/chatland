"use client";
import { menuActive } from "@/atoms/uiAtoms";
import { useRecoilValue } from "recoil";
import MenuLi from "./ui/Buttons/MenuLi";
import CloseSessionButton from "./ui/Buttons/CloseSession";
const Menu = () => {
  const active = useRecoilValue(menuActive);
  return (
    active && (
      <div className="h-5/6 w-full absolute top-16 left-0 bg-indigo-950 flex flex-col items-center justify-between p-4">
        <ul className="h-4/5">
          <MenuLi route="/home">Home</MenuLi>
          <MenuLi route="/myRooms">My Rooms</MenuLi>
          <MenuLi route="/profile">Profile</MenuLi>
          <MenuLi route="/settings">Settings</MenuLi>
        </ul>
        <CloseSessionButton></CloseSessionButton>
      </div>
    )
  );
};
export default Menu;
