"use client";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { menuActive } from "@/lib/atoms/uiAtoms";
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
      className="cursor-pointer w-full h-20 grid place-items-center text-orange-100 text-xl hover:bg-orange-100 hover:text-indigo-900"
    >
      <button>{children}</button>
    </li>
  );
};
export default MenuLi;
