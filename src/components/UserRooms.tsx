"use client";
import { userEmailAtom, userRoomsAtom } from "@/lib/atoms/atoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMyRoomsIDs } from "../lib/hooks";
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
    <div className=" h-full w-full py-3 flex gap-3 flex-wrap items-center justify-start">
      {userRooms.map((roomID: string) => (
        <RoomIdDisplay key={roomID} roomId={roomID} />
      ))}
    </div>
  );
};
export default UserRooms;
