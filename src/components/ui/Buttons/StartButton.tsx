import Link from "next/link";
const StartButton = ({ children }: any) => {
  return (
    <Link href="/login">
      <button className="text-orange-100 bg-black py-4 px-9 rounded-full shadow-custom text-4xl">
        {children}
      </button>
    </Link>
  );
};

export default StartButton;
