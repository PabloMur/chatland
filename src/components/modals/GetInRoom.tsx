import { getInRoomModal } from "@/lib/atoms/uiAtoms";
import { useRecoilState } from "recoil";
const GetInRoomModal = () => {
  const [modalActive, setModalActive] = useRecoilState(getInRoomModal);
  return (
    modalActive && (
      <div className="h-full w-full absolute backdrop-blur z-10 grid place-items-center top-0">
        <div className="bg-orange-50 h-1/2 w-1/2 rounded-xl">
          <div
            onClick={() => {
              setModalActive(false);
            }}
          >
            x
          </div>
          <div>aasd</div>
        </div>
      </div>
    )
  );
};
export default GetInRoomModal;
