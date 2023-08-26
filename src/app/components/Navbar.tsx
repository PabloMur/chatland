import Menu from "./Menu";
import Burger from "./ui/Buttons/Burger";
import Logo from "./ui/Logo";
const Navbar = () => {
  return (
    <div className="h-1/6 w-full bg-indigo-900 flex items-center justify-between p-4 z-20 sm:hidden">
      <Logo></Logo>
      <Burger />
      <Menu />
    </div>
  );
};
export default Navbar;
