import TertiaryTitle from "./Titles/TertiaryTitle";
const Options = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:items-center sm:justify-center">
      <button className="w-full sm:w-56 bg-orange-100 rounded-xl p-3 my-2 sm:m-3">
        <TertiaryTitle>Create Room</TertiaryTitle>
      </button>
      <button className="w-full sm:w-56 bg-orange-100 rounded-xl p-3 my-2 sm:m-3">
        <TertiaryTitle>Get in Room</TertiaryTitle>
      </button>
    </div>
  );
};

export default Options;
