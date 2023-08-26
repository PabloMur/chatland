import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
import Options from "../components/ui/Options";

const HomePage = () => {
  return (
    <div className="h-5/6 w-full bg-indigo-900 flex flex-col items-center justify-center">
      <SecondaryTitle>Welcome</SecondaryTitle>
      <Options></Options>
    </div>
  );
};
export default HomePage;
