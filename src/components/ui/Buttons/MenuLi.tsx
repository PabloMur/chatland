"use client";
import { useGoTo } from "@/lib/hooks";
import { menuActive } from "@/lib/atoms/uiAtoms";
import { useSetRecoilState } from "recoil";
const MenuLi = ({ children, route }: any) => {
  const setMenuAtom = useSetRecoilState(menuActive);
  const goTo = useGoTo();
  const handleClick = () => {
    setMenuAtom(false);
    goTo(route);
  };
  return (
    <li
      onClick={handleClick}
      className="cursor-pointer w-full py-5 mt-5 grid place-items-center text-indigo-900 hover:bg-indigo-200 text-xl"
    >
      <button>{children}</button>
    </li>
  );
};
export default MenuLi;
