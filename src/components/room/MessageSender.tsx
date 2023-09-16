"use client";
import FormInput from "../ui/FormInput";
import TertiaryTitle from "../ui/Titles/TertiaryTitle";

const MessageSender = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(e.target.message.value);
    e.target.message.value = "";
  };
  return (
    <div className="h-16 bg-indigo-900 grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="h-full flex w-full items-center justify-center bg-orange-600"
      >
        <div className="w-3/4">
          <FormInput name="message" type="text" />
        </div>
        <button className="w-1/6 h-full bg-orange-50">
          <TertiaryTitle>Enviar</TertiaryTitle>
        </button>
      </form>
    </div>
  );
};
export default MessageSender;
