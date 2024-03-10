"use client";
import FormInput from "../ui/FormInput";
import SecondaryTitle from "../ui/Titles/SecondaryTitles";
import { useGoTo } from "@/lib/hooks";
import { APIGetToken, APIGetUserMe } from "@/lib/APICalls";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  userEmailAtom,
  userImageAtom,
  userPasswordAtom,
  userTokenAtom,
} from "@/lib/atoms/atoms";
import { loaderAtom } from "@/lib/atoms/uiAtoms";

export default function PasswordForm() {
  const email = useRecoilValue(userEmailAtom);
  const [password, setPassword] = useRecoilState(userPasswordAtom);
  const imageSetter = useSetRecoilState(userImageAtom);
  const setLoaderState = useSetRecoilState(loaderAtom);
  const setUserToken = useSetRecoilState(userTokenAtom);
  const goTo = useGoTo();

  const handleOnChage = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoaderState(true);
    const token = await APIGetToken(email, password);
    setLoaderState(false);
    if (token) {
      const userData = await APIGetUserMe(email, token);
      goTo("/home");
      setUserToken(token);
      imageSetter(userData.userData.userImage);
    } else {
      alert("Contraseña incorrecta");
    }
  };
  return (
    <div className="w-full sm:w-1/2 h-[90vh] flex flex-col items-center justify-center z-10">
      <SecondaryTitle>Contraseña</SecondaryTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <FormInput
          title="Tu contraseña"
          type="password"
          name="password"
          onChange={handleOnChage}
          value={password}
        />

        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg mt-1">
          Enviar
        </button>
      </form>
    </div>
  );
}
