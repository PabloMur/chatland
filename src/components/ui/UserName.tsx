"use client";
import { useUserStore } from "@/lib/stores/userStore";
import TertiaryTitle from "./Titles/TertiaryTitle";
const UserName = () => {
  const userNameValue = useUserStore((s) => s.userName);
  return <TertiaryTitle>User: {userNameValue}</TertiaryTitle>;
};
export default UserName;
