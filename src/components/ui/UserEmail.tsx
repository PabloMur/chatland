"use client";
import { useUserStore } from "@/lib/stores/userStore";
import TertiaryTitle from "./Titles/TertiaryTitle";
const UserName = () => {
  const userEmail = useUserStore((s) => s.userEmail);
  console.log(userEmail);

  return <TertiaryTitle>Email: {userEmail}</TertiaryTitle>;
};
export default UserName;
