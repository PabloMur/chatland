import { atom } from "recoil";

export const userNameAtom = atom({
  key: "userName",
  default: "user",
});

export const userEmailAtom = atom({
  key: "userEmail",
  default: "",
});

export const userPasswordAtom = atom({
  key: "userPassword",
  default: "",
});

export const userTokenAtom = atom({
  key: "userToken",
  default: "",
});
