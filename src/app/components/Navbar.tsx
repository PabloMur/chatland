import Burger from "./ui/Buttons/Burger";
import Logo from "./ui/Logo";
const Navbar = () => {
  return (
    <div className="h-16 w-full absolute bg-indigo-900 flex items-center justify-between p-4 z-20 sm:hidden">
      <Logo></Logo>
      <Burger />
    </div>
  );
};
export default Navbar;
