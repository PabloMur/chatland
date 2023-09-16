import { getInRoomModal } from "@/lib/atoms/uiAtoms";
import { useRecoilState } from "recoil";
import GetInRoom from "../forms/GetInRoom";
const GetInRoomModal = () => {
    const [modalActive, setModalActive] = useRecoilState(getInRoomModal);
    return (
        modalActive && (
            <div className="h-full w-full absolute backdrop-blur z-10 grid place-items-center top-0">
                <div className="bg-indigo-100 h-1/2 w-1/2 rounded-xl">
                    <div
                        className="rounded-xl flex justify-end pr-3"
                        onClick={() => {
                            setModalActive(false);
                        }}
                    >
                        x
                    </div>
                    <div className="h-full rounded-xl grid place-items-center">
                        <GetInRoom></GetInRoom>
                    </div>
                </div>
            </div>
        )
    );
};
export default GetInRoomModal;
