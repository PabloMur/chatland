"use client";
import { useState } from "react";

export default function CloseSessionModal() {
  const [modalActive, setModalActive] = useState(false);
  const handleClosSession = () => {
    alert("Cerrando Sesion");
  };
  const handleCancelCloseSesion = () => {
    setModalActive(false);
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
