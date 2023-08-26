import Menu from "./Menu";
import Burger from "./ui/Buttons/Burger";
import Logo from "./ui/Logo";
const Navbar = () => {
  return (
    <div className="h-20 w-full bg-indigo-900 flex items-center justify-between p-4">
      <Logo></Logo>
      <Burger />
      <Menu />
    </div>
  );
};
export default Navbar;
