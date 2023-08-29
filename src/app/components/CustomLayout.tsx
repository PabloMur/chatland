"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { RecoilRoot } from "recoil";
import Menu from "./Menu";
import Sidebar from "./Sidebar";
import { Suspense } from "react";
import Loader from "./Loader";

const LayoutMenu = ({ children }: any) => {
  return (
    <RecoilRoot>
      <div className="flex flex-col sm:flex-row">
        <Loader />
        <Navbar />
        <Menu />
        <Sidebar />
        {children}
      </div>
    </RecoilRoot>
  );
};
const LayoutOnly = ({ children }: any) => {
  return (
    <RecoilRoot>
      <div className="flex flex-col sm:flex-row">
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
