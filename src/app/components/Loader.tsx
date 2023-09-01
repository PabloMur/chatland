import { loaderAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilValue } from "recoil";
import GiphyComponent from "./ui/Spinner/Spinner";
const Loader = () => {
  const active = useRecoilValue(loaderAtom);
  return (
    active && (
      <div className="absolute grid place-items-center h-screen w-full bg-gradient-to-br from-green-500 via-blue-700 to-purple-800 text-orange-100 z-20">
        <GiphyComponent />
      </div>
    )
  );
};
export default Loader;
