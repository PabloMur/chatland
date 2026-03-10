"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const LayoutMenu = ({ children }: any) => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen" style={{ background: "#0a0a0f" }}>
      <Navbar />
      <Menu />
      <Sidebar />
      <Loader />
      <div className="flex-1 sm:ml-0">
        {children}
      </div>
    </div>
  );
};

const LayoutOnly = ({ children }: any) => {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <Loader />
      {children}
    </div>
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
