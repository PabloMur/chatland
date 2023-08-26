"use client";
import { useRecoilValue } from "recoil";
import { userEmailAtom } from "@/atoms/atoms";
const UserName = () => {
  const userEmail = useRecoilValue(userEmailAtom);
  return <div>{userEmail}</div>;
};
export default UserName;
