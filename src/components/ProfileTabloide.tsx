import UserEmail from "../components/ui/UserEmail";
import UserName from "../components/ui/UserName";
//import Image from "next/image";
const ProfileContent = () => {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="bg-orange-100 h-2/3 w-2/3 flex overflow-hidden rounded-3xl shadow-custom">
        <div className="bg-purple-400 w-1/2 grid place-items-center">
          <div className="h-2/3 w-2/3 bg-black text-white grid place-items-center rounded-full">
            Imagen
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center flex-col">
          <UserName />
          <UserEmail />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
