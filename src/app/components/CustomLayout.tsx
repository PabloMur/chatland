"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
const LayoutMenu = ({ children }: any) => {
  return (
    <div className="flex">
      <Navbar />
      {children}
    </div>
  );
};
const LayoutOnly = ({ children }: any) => {
  return <div>{children}</div>;
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
