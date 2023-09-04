import { loaderAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilValue } from "recoil";
import GiphyComponent from "./ui/Spinner/Spinner";
const Loader = () => {
  const active = useRecoilValue(loaderAtom);
  return (
    active && (
      <div className="absolute grid place-items-center h-screen w-full backdrop-blur-3xl text-orange-100 z-20">
        <GiphyComponent />
      </div>
    )
  );
};
export default Loader;
