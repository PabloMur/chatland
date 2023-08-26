"use client";
import FormInput from "./ui/FormInput";
import SecondaryTitle from "./ui/Titles/SecondaryTitles";
import TertiaryTitle from "./ui/Titles/TertiaryTitle";
import { useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [passOne, setpassOne] = useState("");
  const [passTwo, setpassTwo] = useState("");

  const handleOnChage = (e: any) => {
    setEmail(e.target.value);
  };
  const handleOnChagePassOne = (e: any) => {
    setpassOne(e.target.value);
  };
  const handleOnChagePassTwo = (e: any) => {
    setpassTwo(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(email);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center z-10">
      <SecondaryTitle>Registrate</SecondaryTitle>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white p-4 rounded-lg"
      >
        <label>
          <TertiaryTitle>Tu email</TertiaryTitle>
          <FormInput
            type="email"
            name="email"
            onChange={handleOnChage}
            value={email}
          />
        </label>
        <label>
          <TertiaryTitle>Ingresa una contraseña</TertiaryTitle>
          <FormInput
            type="password"
            name="pone"
            onChange={handleOnChagePassOne}
            value={passOne}
          />
        </label>
        <label>
          <TertiaryTitle>Repite la contraseña</TertiaryTitle>
          <FormInput
            type="password"
            name="ptwo"
            onChange={handleOnChagePassTwo}
            value={passTwo}
          />
        </label>
        <button className="w-full bg-indigo-900 py-3 text-orange-100 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default SignupForm;
