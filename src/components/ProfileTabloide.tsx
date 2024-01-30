"use client";
import UserEmail from "../components/ui/UserEmail";
import UserName from "../components/ui/UserName";
import { userImageAtom } from "@/lib/atoms/atoms";
import { useRecoilValue } from "recoil";

const ProfileContent = () => {
  const userImage = useRecoilValue(userImageAtom);
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="bg-orange-100 h-2/3 w-2/3 flex overflow-hidden rounded-3xl shadow-custom">
        <div className="bg-indigo-900 w-1/2 grid place-items-center">
          <div className="h-2/3 w-2/3 bg-black text-white rounded-full">
            <img src={userImage} alt="imagen de usuario" />
          </div>
        </div>
        <div className="flex w-1/2 items-start justify-center flex-col pl-10">
          <UserName />
          <UserEmail />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
