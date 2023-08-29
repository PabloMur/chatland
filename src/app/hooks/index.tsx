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

//Room Hooks -->
export const useGoTo = () => {
  const router = useRouter();
  return router;
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
export const useGetToken = async (email: string, password: string) => {
  try {
    const token = await APIGetToken(email, password);
    if (token) return token;
  } catch (error) {
    console.error(error);
  }
};
export const useGetUserMe = async (email: string, token: any) => {
  try {
    const data = await APIGetUserMe(email, token);
    if (data) return data;
  } catch (error) {
    console.error(error);
  }
};

export const useCreateUser = async (email: string, password: string) => {
  try {
    const createdUser = await APICreateUser(email, password);
    return createdUser;
  } catch (error) {
    console.error(error);
  }
};

export const useDeleteUser = async (token: string) => {
  try {
    const deletedUser = await APIDeleteAccount(token);
    return deletedUser;
  } catch (error) {
    console.error(error);
  }
};

export const useUpdateUserData = async (
  token: string,
  email: string,
  newData: any
) => {
  try {
    const updatedUser = await APIUpdateUserData(token, email, newData);
    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};
//User Hooks -->

export const useMyRoomsIDs = async (email: string) => {
  try {
    const myRooms = await APIGetRoomsIDs(email);
    return myRooms;
  } catch (error) {
    console.error(error);
  }
};

export const useMyGuestRoomsIDs = async (email: string) => {
  try {
    const myRooms = await APIGetGuestRoomsIDs(email);
    return myRooms;
  } catch (error) {
    console.error(error);
  }
};

export const useAPISetImGuest = async (
  email: string,
  chatroomID: string,
  roomId: string
) => {
  try {
    const myRooms = await APISetImGuest(email, chatroomID, roomId);
    return myRooms;
  } catch (error) {
    console.error(error);
  }
};

export const useCreateRoom = async (email: string, token: string) => {
  try {
    const createRoom = await APICreateChatroom(email, token);
    return createRoom;
  } catch (error) {
    console.error(error);
  }
};

export const useDeleteRoom = async (roomId: string, token: string) => {
  try {
    const deleteRoom = await APIDeleteChatroom(roomId, token);
    return deleteRoom;
  } catch (error) {
    console.error(error);
  }
};

export const useGetInRoom = async (roomId: string) => {
  try {
    const getInRoom = await APIGetRoomRealtimeID(roomId);
    return getInRoom;
  } catch (error) {
    console.error(error);
  }
};

export const useSendMessage = async (message: any, token: any) => {
  try {
    const sendMessageRes = await APISendMessage(message, token);
    return sendMessageRes;
  } catch (error) {
    console.error(error);
  }
};

//Navitgation Room -->
