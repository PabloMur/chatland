"use client";
import FormInput from "./ui/FormInput";
import SecondaryTitle from "./ui/SecondaryTitles";
import TertiaryTitle from "./ui/TertiaryTitle";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  const handleOnChage = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(email);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center z-10">
      <SecondaryTitle>Inicia Sesion</SecondaryTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white p-4 rounded-lg shadow-2xl bg-opacity-80"
      >
        <label>
          <TertiaryTitle>Ingresa tu email</TertiaryTitle>
          <FormInput
            type="email"
            name="email"
            onChange={handleOnChage}
            value={email}
          />
        </label>
        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
