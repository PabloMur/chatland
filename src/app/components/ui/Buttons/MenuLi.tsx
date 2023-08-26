"use client";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { menuActive } from "@/atoms/uiAtoms";
const MenuLi = ({ children, route }: any) => {
  const router = useRouter();
  const setMenuAtom = useSetRecoilState(menuActive);
  const handleClick = () => {
    setMenuAtom(false);
    router.push(route);
  };
  return (
    <li
      onClick={handleClick}
      className="w-full h-1/4 grid place-items-center text-orange-100 text-xl"
    >
      <button>{children}</button>
    </li>
  );
};
export default MenuLi;
