"use client";
import { useRecoilValue } from "recoil";
import { userNameAtom } from "@/atoms/atoms";
const UserName = () => {
  const userNameValue = useRecoilValue(userNameAtom);
  return <div>{userNameValue}</div>;
};
export default UserName;
