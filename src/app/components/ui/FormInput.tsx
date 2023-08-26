type InputProps = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
};
const FormInput = ({ type, name, onChange, value }: InputProps) => {
  return (
    <input
      className="h-10 my-3 p-3 rounded-lg bg-indigo-200"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
export default FormInput;
