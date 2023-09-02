"use client";
import { useRecoilValue } from "recoil";
import { userNameAtom } from "@/lib/atoms/atoms";
import TertiaryTitle from "./Titles/TertiaryTitle";
const UserName = () => {
  const userNameValue = useRecoilValue(userNameAtom);
  return <TertiaryTitle>User: {userNameValue}</TertiaryTitle>;
};
export default UserName;
