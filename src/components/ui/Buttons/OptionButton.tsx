import TertiaryTitle from "../Titles/TertiaryTitle";
import Image from "next/image";

const OptionButton = ({ onClick, children, src }: any) => {
  return (
    <button
      className="w-full bg-orange-50 h-full rounded-3xl gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-2/3 rounded-t-3xl overflow-hidden">
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          <Image
            alt="Imagen fuente para el boton de accion"
            src={src}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="h-1/3 rounded-b-3xl grid place-items-center">
        <TertiaryTitle>{children}</TertiaryTitle>
      </div>
    </button>
  );
};

export default OptionButton;
