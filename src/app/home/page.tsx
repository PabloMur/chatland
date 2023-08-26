import SecondaryTitle from "../components/ui/SecondaryTitles";
import Options from "../components/ui/Options";

const HomePage = () => {
  return (
    <div className="h-full w-full bg-orange-100 flex items-center justify-center">
      <SecondaryTitle>
        Welcome
        <Options></Options>
      </SecondaryTitle>
    </div>
  );
};
export default HomePage;
