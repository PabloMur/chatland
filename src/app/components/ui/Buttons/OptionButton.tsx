import TertiaryTitle from "../Titles/TertiaryTitle";

const OptionButton = ({ onClick, children }: any) => {
  return (
    <button
      className="w-full sm:w-56 bg-orange-100 hover:bg-indigo-200 rounded-full p-3 my-2 sm:m-3 shadow-custom"
      onClick={onClick}
    >
      <TertiaryTitle>{children}</TertiaryTitle>
    </button>
  );
};
export default OptionButton;
