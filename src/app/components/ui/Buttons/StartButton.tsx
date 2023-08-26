import Link from "next/link";
const StartButton = ({ children }: any) => {
  return (
    <Link href="/login">
      <button className="text-indigo-900 bg-orange-100 p-5 rounded-full shadow-xl text-xl">
        {children}
      </button>
    </Link>
  );
};

export default StartButton;
