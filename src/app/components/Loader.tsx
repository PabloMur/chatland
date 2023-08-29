import { loaderAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilValue } from "recoil";
const Loader = () => {
  const active = useRecoilValue(loaderAtom);
  return (
    active && (
      <div className="absolute grid place-items-center h-screen w-full bg-indigo-950 text-orange-100 z-20">
        LOADING...
      </div>
    )
  );
};
export default Loader;
