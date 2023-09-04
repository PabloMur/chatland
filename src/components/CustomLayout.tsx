"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { RecoilRoot } from "recoil";
import Menu from "./Menu";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const LayoutMenu = ({ children }: any) => {
  return (
    <RecoilRoot>
      <div className="flex flex-col sm:flex-row bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
        <Navbar />
        <Menu />
        <Sidebar />
        <Loader />
        {children}
      </div>
    </RecoilRoot>
  );
};
const LayoutOnly = ({ children }: any) => {
  return (
    <RecoilRoot>
      <div className="flex flex-col sm:flex-row bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
        <Loader />
        {children}
      </div>
    </RecoilRoot>
  );
};

const CustomLayout = ({ children }: any) => {
  const pathname = usePathname();
  const rutasSinMenu = ["/", "/login", "/signup", "/password"];
  const layoutMenu = !rutasSinMenu.includes(pathname);
  return !layoutMenu ? (
    <LayoutOnly>{children}</LayoutOnly>
  ) : (
    <LayoutMenu>{children}</LayoutMenu>
  );
};
export default CustomLayout;
