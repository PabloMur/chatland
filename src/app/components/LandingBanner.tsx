import Link from "next/link";
const LandingBanner = () => {
  return (
    <div className="w-1/2 h-4/5 flex flex-col items-center justify-center">
      <h1 className="text-indigo-900 text-5xl">Bienvenido a Chatland</h1>
      <p className="text-indigo-900 text-2xl w-4/5 my-9 text-center">
        {`"... Donde las conversaciones fluyen y las risas nunca faltan ..."`}
      </p>
      <Link href="/login">
        <button className="bg-indigo-900 text-orange-100 p-5 rounded-full shadow-xl">
          Comenzar
        </button>
      </Link>
    </div>
  );
};
export default LandingBanner;
