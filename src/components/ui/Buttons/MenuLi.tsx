"use client";
import { menuActive } from "@/lib/atoms/uiAtoms";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
const MenuLi = ({ children, route }: any) => {
    const setMenuAtom = useSetRecoilState(menuActive);
    const handleClick = () => {
        setMenuAtom(false);
    };
    return (
        <Link
            onClick={handleClick}
            className="cursor-pointer w-full py-5 mt-5 grid place-items-center text-indigo-900 hover:bg-indigo-200 text-xl"
            href={route}
        >
            <button>{children}</button>
        </Link>
    );
};
export default MenuLi;
