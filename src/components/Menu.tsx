"use client";
import { menuActive } from "@/lib/atoms/uiAtoms";
import { useRecoilValue } from "recoil";
import MenuLi from "./ui/Buttons/MenuLi";
import CloseSessionButton from "./ui/Buttons/CloseSession";
const Menu = () => {
  const active = useRecoilValue(menuActive);
  return (
    active && (
      <div>
        <div className="h-screen w-full sm:w-1/4 absolute left-0 bg-white flex flex-col items-center justify-between p-4 z-10">
          <div className="h-16"></div>
          <ul className="h-3/5 w-full">
            <MenuLi route="/home">Home</MenuLi>
            <MenuLi route="/myRooms">My Rooms</MenuLi>
            <MenuLi route="/profile">Profile</MenuLi>
          </ul>
          <CloseSessionButton></CloseSessionButton>
        </div>
      </div>
    )
  );
};
export default Menu;
