import TertiaryTitle from "../Titles/TertiaryTitle";

const OptionButton = ({ onClick, children }: any) => {
  return (
    <button className="w-full bg-red-200 h-full rounded-xl" onClick={onClick}>
      <TertiaryTitle>{children}</TertiaryTitle>
    </button>
  );
};
export default OptionButton;
