import { useRouter } from "next/navigation";
const CloseSessionButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-1/4 grid place-items-center text-orange-100 text-xls m-4">
      <button
        className="h-auto p-3 grid place-items-center text-orange-100 text-xl border border-orange-100 rounded-xl"
        onClick={handleClick}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};
export default CloseSessionButton;
