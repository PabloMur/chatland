let callURL: string;
callURL = "/api/";

export const APICheckEmail = async (email: any) => {
  try {
    console.log("ApiCall");
    const fetching = await fetch("/api/user/check/" + email);
    const response = await fetching.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const APICreateUser = async (email: string, password: string) => {
  try {
    const fetching = await fetch(callURL + "user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name: "User",
        hasCreatedRoom: false,
      }),
    });
    const response = await fetching.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetToken = async (email: string, password: string) => {
  try {
    const fetching = await fetch(callURL + "auth/token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await fetching.json();
    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const APICreateChatroom = async (email: string, token: string) => {
  try {
    const fetching = await fetch(callURL + "createRoom", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    const response = await fetching.json();
    return response.roomCreated.roomId;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetRoomRealtimeID = async (roomId: string) => {
  try {
    const fetching = await fetch(callURL + "getRoomId", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
    });
    const response = await fetching.json();
    console.log(JSON.stringify(response) + " response de get in room");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetRoomsIDs = async (email: string) => {
  try {
    const fetching = await fetch(callURL + "myRooms", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const response = await fetching.json();
    return response.roomIds;
  } catch (error) {
    console.error(error);
  }
};

export const APIGetGuestRoomsIDs = async (email: string) => {
  try {
    const fetching = await fetch(callURL + "myGuestRooms", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const response = await fetching.json();
    return response.roomIds;
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
    const fetching = await fetch(callURL + "guestRoom", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatroomID,
        email,
        roomId,
      }),
    });
    const response = await fetching.json();
    return response.roomIds;
  } catch (error) {
    console.error(error);
  }
};

export const APISendMessage = async (message: any, token: string) => {
  try {
    const fetching = await fetch(callURL + "message", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });
    const response = await fetching.json();
    return response;
  } catch (error) {
    console.error(error);
  }
  return message;
};

export const APIGetUserMe = async (email: string, token: string) => {
  try {
    const fetching = await fetch(callURL + "me", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    const response = await fetching.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const APIDeleteChatroom = async (roomID: string, token: string) => {
  try {
    const fetching = await fetch(callURL + "deleteRoom?roomId=" + roomID, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await fetching.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const APIDeleteAccount = async (token: string) => {
  try {
    const fetching = await fetch(callURL + "deleteAccount", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await fetching.json();
    return response;
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
    const fetching = await fetch(callURL + "meUpdate", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, newData }),
    });
    console.log({ email, newData });

    const response = await fetching.json();
    console.log("response" + " " + JSON.stringify(response));

    return response;
  } catch (error) {
    console.error(error);
  }
};
