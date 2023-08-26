import Link from "next/link";
const StartButton = ({ children }: any) => {
  return (
    <Link href="/login">
      <button className="bg-indigo-900 text-orange-100 p-5 rounded-full shadow-xl">
        {children}
      </button>
    </Link>
  );
};

export default StartButton;
