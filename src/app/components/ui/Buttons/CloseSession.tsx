import { useRouter } from "next/navigation";
const CloseSessionButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="w-full h-1/4 grid place-items-center text-orange-100 text-xls">
      <button
        className="w-full h-auto p-3 grid place-items-center text-orange-100 text-xl border border-orange-100 rounded-xl"
        onClick={handleClick}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};
export default CloseSessionButton;
