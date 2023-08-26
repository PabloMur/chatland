import Image from "next/image";

const CustomImageBanner = ({ imageUrl, imageAlt }: any) => {
  return (
    <div className="w-11/12 h-screen absolute z-0 grid place-items-center right-0">
      <Image
        className="h-1/2 w-auto rounded-bl-full rounded-tl-full"
        src={imageUrl}
        alt={imageAlt}
      />
    </div>
  );
};
export default CustomImageBanner;
