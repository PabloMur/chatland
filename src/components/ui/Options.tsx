"use client";
import { userEmailAtom, userTokenAtom } from "@/lib/atoms/atoms";
import OptionButton from "./Buttons/OptionButton";
import { useCreateRoom, useGoTo } from "@/lib/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getInRoomModal, loaderAtom } from "@/lib/atoms/uiAtoms";

const Options = () => {
  const createRoom = useCreateRoom();
  const userEmail = useRecoilValue(userEmailAtom);
  const userToken = useRecoilValue(userTokenAtom);
  const modalSetter = useSetRecoilState(getInRoomModal);
  const setLoader = useSetRecoilState(loaderAtom);
  const goTo = useGoTo();

  const handleCreateRoom = async () => {
    setLoader(true);
    const roomCreated = await createRoom(userEmail, userToken);
    setLoader(false);
    if (roomCreated) goTo(`/room/${roomCreated}`);
  };
  const handleGetInRoom = () => {};
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="backdrop-blur-3xl h-2/3 w-2/3 flex overflow-hidden rounded-3xl shadow-custom p-3 gap-3">
        <OptionButton onClick={handleCreateRoom}>
          Create a Chat Room
        </OptionButton>
        <OptionButton
          onClick={() => {
            modalSetter(true);
          }}
        >
          Get in a Chat Room
        </OptionButton>
      </div>
    </div>
  );
};

export default Options;
