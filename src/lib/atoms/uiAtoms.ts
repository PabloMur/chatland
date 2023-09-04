import { atom } from "recoil";

export const menuActive = atom({
  key: "menuActiveAtom",
  default: false,
});

export const loaderAtom = atom({
  key: "loaderAtom",
  default: false,
});

export const getInRoomModal = atom({
  key: "getInRoomModal",
  default: false,
});
