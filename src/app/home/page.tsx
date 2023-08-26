import SecondaryTitle from "../components/ui/Titles/SecondaryTitles";
import Options from "../components/ui/Options";

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-indigo-900 flex flex-col items-center justify-center">
      <SecondaryTitle>Welcome</SecondaryTitle>
      <Options></Options>
    </div>
  );
};
export default HomePage;
