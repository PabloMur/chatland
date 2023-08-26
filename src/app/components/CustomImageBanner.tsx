import Image from "next/image";

const CustomImageBanner = ({ imageUrl, imageAlt }: any) => {
  return (
    <div className="w-11/12 h-sceen rounded-tl-full rounded-bl-full overflow-hidden absolute z-0 -right-0">
      <Image className="h-full w-fit;" src={imageUrl} alt={imageAlt} />
    </div>
  );
};
export default CustomImageBanner;
