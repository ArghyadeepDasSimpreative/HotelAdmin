import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ModalComponent = ({ isOpen, onClose, children, allowOverlayClick = true }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {allowOverlayClick && (
                <div
                    className="absolute inset-0 bg-opacity-40 backdrop-blur-sm"
                    onClick={onClose}
                ></div>
            )}

            <motion.div
                className="relative bg-white p-6 rounded-lg shadow-lg w-auto min-w-[600px] max-w-[80vw] max-h-[80vh] overflow-scroll z-10"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
               
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    <IoClose size={24} />
                </button>

                {/* Modal Body */}
                <div className="mt-2">{children}</div>
            </motion.div>
        </div>
    );
};

export default ModalComponent;
