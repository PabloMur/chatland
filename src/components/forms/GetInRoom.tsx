"use client";
//con este modal deberia ser capaz de ingresar a una sala
import FormInput from "../ui/FormInput";
import { useGoTo, useGetInRoom } from "@/lib/hooks";
import { userEmailAtom, realtimeCodeAtom } from "@/lib/atoms/atoms";
import { getInRoomModal, loaderAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";

const GetInRoom = () => {
  const [roomCode, setRoomCode] = useRecoilState(userEmailAtom);
  const setLoaderState = useSetRecoilState(loaderAtom);
  const setRealtimeCode = useSetRecoilState(realtimeCodeAtom);
  const getInRoom = useGetInRoom();
  const setModalGetInRoomSetter = useSetRecoilState(getInRoomModal);
  const goTo = useGoTo();

  const handleOnChage = (e: any) => {
    setRoomCode(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoaderState(true);
    const response = await getInRoom(roomCode);
    if (response.roomId) {
      setRealtimeCode(response.roomId);
      goTo("/room/" + roomCode);
    }
    setModalGetInRoomSetter(false);
    setLoaderState(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col items-center p-4 rounded-lg bg-opacity-80 justify-center"
    >
      <div className="w-3/5">
        <FormInput
          title="Ingresa el codigo de la sala"
          type="text"
          name="roomCode"
          onChange={handleOnChage}
          placeholder="- - - - -"
        />

        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg">
          Ingresar
        </button>
      </div>
    </form>
  );
};
export default GetInRoom;
