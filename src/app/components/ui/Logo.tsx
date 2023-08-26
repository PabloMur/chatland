"use client";
import { useRouter } from "next/navigation";
import { menuActive } from "@/atoms/uiAtoms";
import { useSetRecoilState } from "recoil";
const Logo = () => {
  const router = useRouter();
  const setMenuAtom = useSetRecoilState(menuActive);
  const handleClick = () => {
    setMenuAtom(false);
    router.push("/home");
  };
  return (
    <button type="button" onClick={handleClick}>
      <h2 className="text-orange-100 text-3xl">Chatland</h2>
    </button>
  );
};
export default Logo;
