import { closeSessionModalAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilState } from "recoil";

export default function CloseSessionModal() {
  const [modalActive, setModalActive] = useRecoilState(closeSessionModalAtom);
  const handleClosSession = () => {
    alert("Cerrando Sesion");
  };
  const handleCancelCloseSesion = () => {
    setModalActive(modalActive);
  };
  return (
    modalActive && (
      <div className="modal container">
        <div className="modal closeSession">
          Are you shure about closing session?
          <div className="botonera">
            <button onClick={handleClosSession}>Cancel</button>
            <button onClick={handleCancelCloseSesion}>Comfirm</button>
          </div>
        </div>
      </div>
    )
  );
}
