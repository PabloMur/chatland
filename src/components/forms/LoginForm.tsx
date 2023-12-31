"use client";
import FormInput from "../ui/FormInput";
import SecondaryTitle from "../ui/Titles/SecondaryTitles";
import { useCheckEmail, useGoTo } from "@/lib/hooks";
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
    if (emailExists.checkEmail) {
      goTo("/password");
      setLoaderState(false);
    } else {
      goTo("/signup");
      setLoaderState(false);
    }
  };
  return (
    <div className="w-full sm:w-1/2 h-screen flex flex-col items-center justify-center z-10">
      <SecondaryTitle>Inicia Sesion</SecondaryTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full sm:w-2/5 "
      >
        <FormInput
          title="Ingresa tu email"
          type="email"
          name="email"
          onChange={handleOnChage}
          value={email}
        />

        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg mt-1">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
