"use client";
import { useRouter } from "next/navigation";
import { menuActive } from "@/lib/atoms/uiAtoms";
import { useSetRecoilState } from "recoil";
const Logo = () => {
  const router = useRouter();
  const setMenuAtom = useSetRecoilState(menuActive);
  const handleClick = () => {
    setMenuAtom(false);
    router.push("/home");
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-24 text-orange-100 text-4xl"
    >
      <h2>Chatland</h2>
    </button>
  );
};
export default Logo;
