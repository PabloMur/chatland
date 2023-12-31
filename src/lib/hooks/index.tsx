"use client";
import { useRouter } from "next/navigation";

import {
  APICheckEmail,
  APICreateChatroom,
  APICreateUser,
  APIDeleteAccount,
  APIDeleteChatroom,
  APIGetGuestRoomsIDs,
  APIGetRoomRealtimeID,
  APIGetRoomsIDs,
  APIGetToken,
  APIGetUserMe,
  APISendMessage,
  APISetImGuest,
  APIUpdateUserData,
} from "@/lib/APICalls";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomCodeAtom, userEmailAtom, userTokenAtom } from "../atoms/atoms";
import { loaderAtom } from "../atoms/uiAtoms";

//Room Hooks -->
export const useGoTo = () => {
  const goTo = useRouter();
  return (route: string) => {
    goTo.push(route);
  };
};

export const useCheckEmail = () => {
  return async (email: string) => {
    try {
      const checkEmail = await APICheckEmail(email);
      return checkEmail;
    } catch (error) {
      console.error(error);
    }
  };
};
export const useGetToken = () => {
  return async (email: string, password: string) => {
    try {
      const token = await APIGetToken(email, password);
      return token;
    } catch (error) {
      console.error(error);
    }
  };
};
export const useGetUserMe = () => {
  return async (email: string, token: any) => {
    try {
      const data = await APIGetUserMe(email, token);
      if (data) return data;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useCreateUser = () => {
  return async (email: string, password: string) => {
    try {
      const createdUser = await APICreateUser(email, password);
      return createdUser;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useDeleteUser = () => {
  return async (token: string) => {
    try {
      const deletedUser = await APIDeleteAccount(token);
      return deletedUser;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useUpdateUserData = () => {
  return async (token: string, email: string, newData: any) => {
    try {
      const updatedUser = await APIUpdateUserData(token, email, newData);
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };
};
//User Hooks -->

export const useMyRoomsIDs = () => {
  const email = useRecoilValue(userEmailAtom);
  return async () => {
    try {
      const myRooms = await APIGetRoomsIDs(email);
      return myRooms;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useMyGuestRoomsIDs = () => {
  const email = useRecoilValue(userEmailAtom);
  return async () => {
    try {
      const myRooms = await APIGetGuestRoomsIDs(email);
      return myRooms;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useAPISetImGuest = () => {
  return async (email: string, chatroomID: string, roomId: string) => {
    try {
      const myRooms = await APISetImGuest(email, chatroomID, roomId);
      return myRooms;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useCreateRoom = () => {
  return async (email: string, token: string) => {
    try {
      const createRoom = await APICreateChatroom(email, token);
      console.log(createRoom);

      return createRoom;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useDeleteRoom = () => {
  const roomCode = useRecoilValue(roomCodeAtom);
  const token = useRecoilValue(userTokenAtom);
  const [loader, setLoader] = useRecoilState(loaderAtom);
  const goTo = useGoTo();
  return async () => {
    try {
      setLoader(true);
      const deleteRoom = await APIDeleteChatroom(roomCode, token);
      goTo("/home");
      setLoader(false);
      return deleteRoom;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useGetInRoom = () => {
  return async (roomId: string) => {
    try {
      const getInRoom = await APIGetRoomRealtimeID(roomId);
      return getInRoom;
    } catch (error) {
      console.error(error);
    }
  };
};

export const useSendMessage = () => {
  return async (message: any, token: any) => {
    try {
      const sendMessageRes = await APISendMessage(message, token);
      return sendMessageRes;
    } catch (error) {
      console.error(error);
    }
  };
};
