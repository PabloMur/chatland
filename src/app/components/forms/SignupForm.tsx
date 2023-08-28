"use client";
import FormInput from "../ui/FormInput";
import SecondaryTitle from "../ui/Titles/SecondaryTitles";
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
