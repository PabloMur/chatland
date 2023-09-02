import OptionButton from "./Buttons/OptionButton";

const Options = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:items-center sm:justify-center">
      <OptionButton
        onClick={() => {
          alert("get in room");
        }}
      >
        Create a Chat Room
      </OptionButton>
      <OptionButton
        onClick={() => {
          alert("get in room");
        }}
      >
        Get in a Chat Room
      </OptionButton>
    </div>
  );
};

export default Options;
