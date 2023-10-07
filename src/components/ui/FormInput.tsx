import TertiaryTitle from "./Titles/TertiaryTitle";

type InputProps = {
  title?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type: string;
  placeholder?: string;
};
const FormInput = ({
  title,
  type,
  name,
  onChange,
  value,
  placeholder,
}: InputProps) => {
  return (
    <label className="w-full">
      <TertiaryTitle>{title}</TertiaryTitle>
      <input
        className="h-10 w-full my-1 p-3 rounded-lg text-black bg-indigo-200 border border-indigo-300"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};
export default FormInput;
