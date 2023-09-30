"use client";
import { motion } from "framer-motion";
import { getInRoomModal } from "@/lib/atoms/uiAtoms";
import { useRecoilState } from "recoil";
import cross from "../../../public/img/cross-circle-svgrepo-com.svg";
import Image from "next/image";
import GetInRoom from "../forms/GetInRoom";

const GetInRoomModal = () => {
  const [modalActive, setModalActive] = useRecoilState(getInRoomModal);
  const handleCloseModal = () => {
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
          <div className="h-5/6 rounded-xl grid place-items-center">
            <GetInRoom />
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default GetInRoomModal;
