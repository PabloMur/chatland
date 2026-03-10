"use client";
import Burger from "./ui/Buttons/Burger";
import Logo from "./ui/Logo";

const Navbar = () => {
  return (
    <div
      className="h-16 w-full fixed top-0 left-0 right-0 flex items-center justify-between px-5 z-20 sm:hidden"
      style={{
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Logo />
      <Burger />
    </div>
  );
};
export default Navbar;
