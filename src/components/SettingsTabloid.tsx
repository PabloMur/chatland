"use client";
import { useRecoilState } from "recoil";
import FormInput from "./ui/FormInput";
import { userEmailAtom, userNameAtom } from "@/lib/atoms/atoms";
//import Image from "next/image";
const SettingsTabloid = () => {
  const [email, setEmail] = useRecoilState(userEmailAtom);
  const [name, setName] = useRecoilState(userNameAtom);

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(JSON.stringify({ name, email }));
  };

  return (
    <div className="h-full w-full grid place-items-center">
      <div className="backdrop-blur-3xl h-2/3 w-2/3 flex overflow-hidden rounded-3xl shadow-custom">
        <div className=" w-1/2 grid place-items-center">
          <div className="h-full w-full bg-black text-white grid place-items-center">
            Arrastra tu nueva imagen
          </div>
        </div>
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col items-center justify-center"
          >
            <FormInput
              title={"Ingresa tu nuevo nombre"}
              name={"name"}
              onChange={handleChangeName}
              value={name}
              type={"text"}
            />
            <FormInput
              title={"Ingresa tu nuevo email"}
              name={"email"}
              onChange={handleChangeEmail}
              value={email}
              type={"text"}
            />
            <button>Guardar Nuevos Datos</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabloid;
