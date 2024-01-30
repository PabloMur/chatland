import axios from "axios";

const baseURL = "/api/";

export const APICheckEmail = async (email: any) => {
  try {
    const response = await axios.get(`${baseURL}user/check/${email}`);
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
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetToken = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}auth/token`, {
      email,
      password,
    });
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
    const response = await axios.get(`${baseURL}room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetRoomsIDs = async (email: string) => {
  try {
    const response = await axios.get(`${baseURL}room/my/${email}`);
    return response.data.roomIds;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetGuestRoomsIDs = async (email: string) => {
  try {
    const response = await axios.get(`${baseURL}room/guest/${email}`);
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
    });
    return response.data.roomIds;
  } catch (error) {
    console.error(error);
  }
};

export const APISendMessage = async (message: any, token: string) => {
  try {
    const response = await axios.put(`${baseURL}room/sendMessage`, message, {
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const APIDeleteChatroom = async (roomID: string, token: string) => {
  try {
    const response = await axios.delete(`${baseURL}room/delete/${roomID}`, {
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

export const APIDeleteAccount = async (token: string) => {
  try {
    const response = await axios.delete(`${baseURL}deleteAccount`, {
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

export const APIUpdateUserData = async (
  token: string,
  email: string,
  newData: any
) => {
  try {
    const response = await axios.put(
      `${baseURL}meUpdate`,
      { email, newData },
      {
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
