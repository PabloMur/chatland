import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userNameAtom = atom({
  key: "userName",
  default: "user",
  effects_UNSTABLE: [persistAtom],
});

export const userEmailAtom = atom({
  key: "userEmail",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userPasswordAtom = atom({
  key: "userPassword",
  default: "",
});

export const userTokenAtom = atom({
  key: "userToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userRoomsAtom = atom({
  key: "userRoomsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const userGuestRoomsAtom = atom({
  key: "userGuestRoomsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const roomCodeAtom = atom({
  key: "roomCodeAtom",
  default: "00000",
  effects_UNSTABLE: [persistAtom],
});

export const realtimeCodeAtom = atom({
  key: "realtimeCode",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
