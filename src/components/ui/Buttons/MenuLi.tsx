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
      className="cursor-pointer w-full py-5 mt-5 grid place-items-center text-indigo-900 hover:bg-indigo-200 text-xl"
    >
      <button>{children}</button>
    </li>
  );
};
export default MenuLi;
