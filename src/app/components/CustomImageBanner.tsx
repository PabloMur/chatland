"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CustomImageBanner = ({ imageUrl, imageAlt }: any) => {
  const pathname = usePathname();
  const root = "/";
  const inRoot = pathname === root;

  if (inRoot) {
    return (
      <div className="w-11/12 sm:w-1/2 h-screen absolute z-0 grid place-items-center right-0">
        <Image
          className="h-2/5 sm:h-auto w-auto sm:w-full rounded-bl-full rounded-tl-full"
          src={imageUrl}
          alt={imageAlt}
        />
      </div>
    );
  } else {
    return (
      <div className="hidden w-11/12 sm:w-1/2 h-screen absolute z-0 sm:grid place-items-center right-0">
        <Image
          className="h-2/5 sm:h-auto w-auto sm:w-full rounded-bl-full rounded-tl-full"
          src={imageUrl}
          alt={imageAlt}
        />
      </div>
    );
  }
};
export default CustomImageBanner;
