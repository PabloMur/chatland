"use client";
import { menuActive } from "@/lib/atoms/uiAtoms";
import { useRecoilState } from "recoil";
const Burger = () => {
  const [active, setActive] = useRecoilState(menuActive);
  const handleClick = () => {
    !active ? setActive(true) : setActive(false);
  };
  return (
    <div
      onClick={handleClick}
      className="h-8 w-8 p-1  border border-orange-100 border-solid rounded flex flex-col items-center justify-around"
    >
      <div className="h-0.5 w-full bg-orange-100"></div>
      <div className="h-0.5 w-full bg-orange-100"></div>
      <div className="h-0.5 w-full bg-orange-100"></div>
    </div>
  );
};

export default Burger;
