type InputProps = {
  title?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type: string;
  placeholder?: string;
};

const FormInput = ({ title, type, name, onChange, value, placeholder }: InputProps) => {
  return (
    <label className="w-full flex flex-col gap-1.5 mb-4">
      {title && (
        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
          {title}
        </span>
      )}
      <input
        className="form-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || title}
      />
    </label>
  );
};
export default FormInput;
