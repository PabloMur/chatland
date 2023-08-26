"use client";
import { useRecoilValue } from "recoil";
import { userNameAtom } from "@/atoms/atoms";
import TertiaryTitle from "./Titles/TertiaryTitle";
const UserName = () => {
  const userNameValue = useRecoilValue(userNameAtom);
  return <TertiaryTitle>{userNameValue}</TertiaryTitle>;
};
export default UserName;
