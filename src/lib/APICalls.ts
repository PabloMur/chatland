import axios from "axios";

const baseURL = "/api/";
const TIMEOUT = 10_000;

export const APICheckEmail = async (email: string) => {
  try {
    const response = await axios.get(`${baseURL}user/check/${encodeURIComponent(email)}`, { timeout: TIMEOUT });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APICreateUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}user/create`, {
      email,
      password,
      name: "User",
      hasCreatedRoom: false,
    }, { timeout: TIMEOUT });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetToken = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}auth/token`, { email, password }, { timeout: TIMEOUT });
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
};

export const APICreateChatroom = async (email: string, token: string) => {
  try {
    const response = await axios.post(
      `${baseURL}room/create`,
      { email },
      {
        timeout: TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.roomCreated.roomId;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetRoomRealtimeID = async (roomId: string) => {
  try {
    const response = await axios.get(`${baseURL}room/${roomId}`, { timeout: TIMEOUT });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetRoomsIDs = async (email: string, token: string) => {
  try {
    const response = await axios.get(`${baseURL}room/my/${encodeURIComponent(email)}`, {
      timeout: TIMEOUT,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.roomIds;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetGuestRoomsIDs = async (email: string, token: string) => {
  try {
    const response = await axios.get(`${baseURL}room/guest/${encodeURIComponent(email)}`, {
      timeout: TIMEOUT,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.roomIds;
  } catch (error) {
    console.error(error);
  }
};

export const APISetImGuest = async (
  email: string,
  chatroomID: string,
  roomId: string
) => {
  try {
    const response = await axios.put(`${baseURL}room/setGuest`, {
      chatroomID,
      email,
      roomId,
    }, { timeout: TIMEOUT });
    return response.data.roomIds;
  } catch (error) {
    console.error(error);
  }
};

interface SendMessagePayload {
  roomId: string;
  chatroomID: string;
  message: string;
}

export const APISendMessage = async (message: SendMessagePayload, token: string) => {
  try {
    const response = await axios.put(`${baseURL}room/sendMessage`, message, {
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return message;
  }
};

export const APIGetUserMe = async (email: string, token: string) => {
  try {
    const response = await axios.post(
      `${baseURL}user/me`,
      { email },
      {
        timeout: TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIDeleteChatroom = async (roomID: string, token: string) => {
  try {
    const response = await axios.delete(`${baseURL}room/delete/${roomID}`, {
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetDemoAccess = async () => {
  try {
    const response = await axios.post(`${baseURL}auth/demo`, {}, { timeout: TIMEOUT });
    return response.data as { token: string; name: string; email: string; roomId: string; chatroomID: string };
  } catch (error) {
    console.error(error);
  }
};

export const APIGetGuestToken = async () => {
  try {
    const response = await axios.post(`${baseURL}auth/guest`, {}, { timeout: TIMEOUT });
    return response.data as { token: string; name: string; email: string };
  } catch (error) {
    console.error(error);
  }
};

export const APILogout = async () => {
  try {
    await axios.post(`${baseURL}auth/logout`, {}, { timeout: TIMEOUT });
  } catch (error) {
    console.error(error);
  }
};

export const APIDeleteAccount = async (token: string) => {
  try {
    const response = await axios.delete(`${baseURL}deleteAccount`, {
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

interface UserUpdateData {
  name?: string;
  userImage?: string;
  [key: string]: string | undefined;
}

export const APIUpdateUserData = async (
  token: string,
  email: string,
  newData: UserUpdateData
) => {
  try {
    const response = await axios.put(
      `${baseURL}meUpdate`,
      { email, newData },
      {
        timeout: TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
