import StartButton from "./ui/Buttons/StartButton";
import LandingTitle from "./ui/Titles/LandingTitle";
const LandingBanner = () => (
  <div className="w-full sm:w-1/2 h-screen sm:h-96 flex flex-col items-center justify-evenly z-10 pr-6">
    <div className="flex flex-col justify-center items-end">
      <LandingTitle>Bienvenido a Chatland</LandingTitle>
      <p className="text-indigo-900 bg-orange-100 rounded-full rounded-tr-none p-4 text-2xl w-4/5 my-2  text-center shadow-custom">
        {`"... Donde las conversaciones fluyen y las risas nunca faltan ..."`}
      </p>
    </div>
    <StartButton>Comenzar</StartButton>
  </div>
);
export default LandingBanner;
