"use client";
import FormInput from "../ui/FormInput";
import { useGoTo, useGetInRoom, useAPISetImGuest } from "@/lib/hooks";
import { useUserStore } from "@/lib/stores/userStore";
import { useRoomStore } from "@/lib/stores/roomStore";
import { useUIStore } from "@/lib/stores/uiStore";

const GetInRoom = () => {
  const roomCode = useRoomStore((s) => s.roomCode);
  const setRoomCode = useRoomStore((s) => s.setRoomCode);
  const setRealtimeCode = useRoomStore((s) => s.setRealtimeCode);
  const userEmail = useUserStore((s) => s.userEmail);
  const setLoaderState = useUIStore((s) => s.setLoader);
  const setModalGetInRoomSetter = useUIStore((s) => s.setGetInRoomModal);
  const getInRoom = useGetInRoom();
  const goTo = useGoTo();
  const setGuest = useAPISetImGuest();

  const handleOnChage = (e: any) => {
    setRoomCode(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoaderState(true);
    const response = await getInRoom(roomCode);
    if (response.roomId) {
      setRealtimeCode(response.roomId);
      await setGuest(userEmail, response.roomId, roomCode);
      setRoomCode(roomCode);
      goTo("/room/" + roomCode);
    }
    setModalGetInRoomSetter(false);
    setLoaderState(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center"
    >
      <div className="w-full mb-5">
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          Pedile el código a quien creó la sala e ingresalo acá
        </p>
        <FormInput
          title="Código de sala"
          type="text"
          name="roomCode"
          onChange={handleOnChage}
          placeholder="ej: 12345"
        />
      </div>
      <button type="submit" className="btn-primary">
        Unirse a la sala
      </button>
    </form>
  );
};
export default GetInRoom;
