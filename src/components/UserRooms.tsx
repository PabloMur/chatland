"use client";
import { userEmailAtom, userRoomsAtom } from "@/lib/atoms/atoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMyRoomsIDs } from "../hooks";
import RoomIdDisplay from "./ui/Buttons/MyRoomButton";

const UserRooms = () => {
  const userEmail = useRecoilValue(userEmailAtom);
  const getMyRooms = useMyRoomsIDs();
  const [userRooms, setUserRooms] = useRecoilState(userRoomsAtom);
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
export default UserRooms;
