import TertiaryTitle from "./Titles/TertiaryTitle";

type InputProps = {
  title: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
};
const FormInput = ({ title, type, name, onChange, value }: InputProps) => {
  return (
    <label>
      <TertiaryTitle>{title}</TertiaryTitle>
      <input
        className="h-10 my-3 p-3 rounded-lg bg-indigo-200 border border-indigo-900 text-indigo-900"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
export default FormInput;
