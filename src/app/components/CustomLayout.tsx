"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { RecoilRoot } from "recoil";
import Menu from "./Menu";
const LayoutMenu = ({ children }: any) => {
  return (
    <RecoilRoot>
      <div className="flex flex-col">
        <Navbar />
        <Menu></Menu>
        <div className="h-screen">{children}</div>
      </div>
    </RecoilRoot>
  );
};
const LayoutOnly = ({ children }: any) => {
  return (
    <RecoilRoot>
      <div>{children}</div>
    </RecoilRoot>
  );
};

const CustomLayout = ({ children }: any) => {
  const pathname = usePathname();
  const rutasSinMenu = ["/", "/login", "/signup"];
  const layoutMenu = !rutasSinMenu.includes(pathname);
  return !layoutMenu ? (
    <LayoutOnly>{children}</LayoutOnly>
  ) : (
    <LayoutMenu>{children}</LayoutMenu>
  );
};
export default CustomLayout;
