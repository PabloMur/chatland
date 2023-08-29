"use client";
import { userEmailAtom, userGuestRoomsAtom } from "@/lib/atoms/atoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMyGuestRoomsIDs } from "../hooks";
import RoomIdDisplay from "./ui/Buttons/MyRoomButton";

const GuestRooms = () => {
  const userEmail = useRecoilValue(userEmailAtom);
  const getMyRooms = useMyGuestRoomsIDs();
  const [userRooms, setUserRooms] = useRecoilState(userGuestRoomsAtom);
  const handleGetRooms = async () => {
    const rooms = await getMyRooms(userEmail);
    setUserRooms(rooms);
  };
  useEffect(() => {
    handleGetRooms();
  }, []);
  return (
    <div className="w-full sm:w-1/2 grid grid-cols-3 place-items-center">
      {userRooms.map((roomID: string) => (
        <RoomIdDisplay key={roomID} roomId={roomID} />
      ))}
    </div>
  );
};
export default GuestRooms;
