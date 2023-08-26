import MenuLi from "./ui/Buttons/MenuLi";
import CloseSessionButton from "./ui/Buttons/CloseSession";
import Logo from "./ui/Logo";
const Sidebar = () => {
  return (
    <div className="hidden none h-screen w-1/4 bg-indigo-900 sm:flex flex-col items-center justify-between p-4">
      <Logo />
      <ul className="h-3/5">
        <MenuLi route="/home">Home</MenuLi>
        <MenuLi route="/myRooms">My Rooms</MenuLi>
        <MenuLi route="/profile">Profile</MenuLi>
        <MenuLi route="/settings">Settings</MenuLi>
      </ul>
      <CloseSessionButton></CloseSessionButton>
    </div>
  );
};
export default Sidebar;
