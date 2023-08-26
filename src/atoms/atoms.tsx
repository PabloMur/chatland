import { atom } from "recoil";

export const userNameAtom = atom({
  key: "userName",
  default: "user",
});

export const userEmailAtom = atom({
  key: "userEmail",
  default: "example@gmail.com",
});
