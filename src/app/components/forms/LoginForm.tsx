"use client";
import FormInput from "../ui/FormInput";
import SecondaryTitle from "../ui/Titles/SecondaryTitles";
import { useCheckEmail, useGoTo } from "@/app/hooks";
import { userEmailAtom } from "@/lib/atoms/atoms";
import { loaderAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";

const LoginForm = () => {
  const [email, setEmail] = useRecoilState(userEmailAtom);
  const setLoaderState = useSetRecoilState(loaderAtom);
  const checkEmail = useCheckEmail();
  const goTo = useGoTo();

  const handleOnChage = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoaderState(true);
    const emailExists = await checkEmail(email);
    setLoaderState(false);
    if (emailExists.checkEmail) goTo.push("/password");
    else {
      alert("El email ingresado no existe");
    }
  };
  return (
    <div className="w-full sm:w-1/2 h-screen flex flex-col items-center justify-center z-10">
      <SecondaryTitle>Inicia Sesion</SecondaryTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white p-4 rounded-lg shadow-2xl bg-opacity-80"
      >
        <FormInput
          title="Ingresa tu email"
          type="email"
          name="email"
          onChange={handleOnChage}
          value={email}
        />

        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
