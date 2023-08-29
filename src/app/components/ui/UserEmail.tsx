"use client";
import { useRecoilValue } from "recoil";
import { userEmailAtom } from "@/lib/atoms/atoms";
import TertiaryTitle from "./Titles/TertiaryTitle";
const UserName = () => {
  const userEmail = useRecoilValue(userEmailAtom);
  return <TertiaryTitle>Email: {userEmail}</TertiaryTitle>;
};
export default UserName;
