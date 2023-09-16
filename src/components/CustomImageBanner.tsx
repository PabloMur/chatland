"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const CustomImageBanner = ({ imageUrl, imageAlt }: any) => {
    const root = "/";
    const inRoot = usePathname() === root;

    const containerClass = `w-11/12 sm:w-1/2 h-screen absolute z-0 ${
        inRoot ? "grid place-items-center" : "hidden sm:grid place-items-center"
    } right-0`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`box ${containerClass}`}
        >
            <Image
                className="h-2/5 sm:h-auto w-auto sm:w-full rounded-bl-full rounded-tl-full shadow-custom"
                src={imageUrl}
                alt={imageAlt}
            />
        </motion.div>
    );
};

export default CustomImageBanner;
