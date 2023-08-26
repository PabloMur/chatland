import Image from "next/image";

const CustomImageBanner = ({ imageUrl, imageAlt }: any) => {
  return (
    <div className="w-1/2 h-4/5 rounded-tl-full rounded-bl-full overflow-hidden">
      <Image className="h-full w-fit;" src={imageUrl} alt={imageAlt} />
    </div>
  );
};
export default CustomImageBanner;
