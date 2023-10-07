"use client";
import { motion } from "framer-motion";
import { deleteRoomAtom } from "@/lib/atoms/uiAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteRoom } from "@/lib/hooks";
import cross from "../../../public/img/cross-circle-svgrepo-com.svg";
import Image from "next/image";
import TertiaryTitle from "../ui/Titles/TertiaryTitle";
import { roomCodeAtom, userTokenAtom } from "@/lib/atoms/atoms";

const DeleteRoomModal = () => {
  const [modalActive, setModalActive] = useRecoilState(deleteRoomAtom);
  const deleteRoom = useDeleteRoom();
  const handleCloseModal = () => {
    setModalActive(false);
  };
  const handleDeleteRoom = async () => {
    await deleteRoom();
    setModalActive(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    modalActive && (
      <motion.div
        className="h-full w-full absolute backdrop-blur z-10 grid place-items-center top-0"
        initial="hidden"
        animate="visible"
        variants={modalVariants}
      >
        <motion.div
          className="bg-orange-50 h-1/2 w-1/2 rounded-xl shadow-xl p-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div
            className="rounded-xl flex justify-end pr-3 cursor-pointer  h-1/6"
            onClick={handleCloseModal}
          >
            <Image
              src={cross}
              alt="imagen de cruz para cerrar el modal"
              width={30}
              height={30}
            />
          </div>
          <div className="h-5/6 rounded-xl flex flex-col items-center justify-between">
            <span className="w-full h-full flex justify-center items-center">
              <TertiaryTitle>
                Estas seguro de <strong>ELIMINAR</strong> la sala?
              </TertiaryTitle>
            </span>
            <div className="flex w-full gap-4 px-2">
              <button
                className="bg-indigo-900 w-full rounded-xl p-4 shadow-xl"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 w-full rounded-xl p-4 shadow-xl"
                onClick={handleDeleteRoom}
              >
                Eliminar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default DeleteRoomModal;
