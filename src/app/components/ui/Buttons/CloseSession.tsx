import { useRouter } from "next/navigation";
const CloseSessionButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-1/4 grid place-items-center">
      <button
        className="h-auto p-3 grid place-items-center text-indigo-900 text-xl border border-indigo-900 rounded-full"
        onClick={handleClick}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};
export default CloseSessionButton;
