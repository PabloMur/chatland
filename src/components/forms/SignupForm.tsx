"use client";
import { useRecoilState, useSetRecoilState } from "recoil";
import FormInput from "../ui/FormInput";
import SecondaryTitle from "../ui/Titles/SecondaryTitles";
import { useState } from "react";
import { userEmailAtom, userTokenAtom } from "@/lib/atoms/atoms";
import { passwordsAreEqual } from "@/lib/tools";
import { useCreateUser, useGetToken, useGoTo } from "@/lib/hooks";
import { loaderAtom } from "@/lib/atoms/uiAtoms";

const SignupForm = () => {
  const [email, setEmail] = useRecoilState(userEmailAtom);
  const [passOne, setpassOne] = useState("");
  const [passTwo, setpassTwo] = useState("");
  const userCreator = useCreateUser();
  const tokenGetter = useGetToken();
  const tokenSetter = useSetRecoilState(userTokenAtom);
  const goTo = useGoTo();
  const setLoaderState = useSetRecoilState(loaderAtom);

  const handleOnChage = (e: any) => {
    setEmail(e.target.value);
  };
  const handleOnChagePassOne = (e: any) => {
    setpassOne(e.target.value);
  };
  const handleOnChagePassTwo = (e: any) => {
    setpassTwo(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoaderState(true);
    const equalPasswords = passwordsAreEqual(passOne, passTwo);
    if (equalPasswords) {
      await userCreator(email, passOne);
      const token = await tokenGetter(email, passOne);
      tokenSetter(token.token);
      goTo("/home");
      setLoaderState(false);
    } else {
      alert("Las passwords no coinciden");
      setLoaderState(false);
    }
  };
  return (
    <div className="w-full sm:w-1/2 h-screen flex flex-col items-center justify-center z-10">
      <SecondaryTitle>Registrate</SecondaryTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white p-4 rounded-lg"
      >
        <FormInput
          title="Tu Email"
          type="email"
          name="email"
          onChange={handleOnChage}
          value={email}
        />

        <FormInput
          title="Ingresa una contraseña"
          type="password"
          name="pone"
          onChange={handleOnChagePassOne}
          value={passOne}
        />

        <FormInput
          title="Repite la contraseña"
          type="password"
          name="ptwo"
          onChange={handleOnChagePassTwo}
          value={passTwo}
        />

        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default SignupForm;
