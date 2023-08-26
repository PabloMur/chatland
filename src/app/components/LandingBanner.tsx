import StartButton from "./ui/Buttons/StartButton";
import LandingTitle from "./ui/Titles/LandingTitle";
const LandingBanner = () => (
  <div className="w-full sm:w-1/2 h-screen sm:h-96 flex flex-col items-center justify-evenly z-10">
    <LandingTitle>Bienvenido a Chatland</LandingTitle>
    <p className="text-orange-100 text-2xl w-4/5 my-9 text-center">
      {`"... Donde las conversaciones fluyen y las risas nunca faltan ..."`}
    </p>
    <StartButton>Comenzar</StartButton>
  </div>
);
export default LandingBanner;
