import "./SuccessModal.scss";
import { motion } from "framer-motion";

export const SuccessModal = ({ children }) => {
  const showSuccessAnim = {
    hidden: {
      transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
      y: "25px",

      opacity: 0,
    },
    visible: {
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      y: "0",
      x: "0",
      opacity: 1,
    },
    exit: {
      transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
      y: "25px",

      opacity: 0,
    },
  };

  return (
    <motion.dialog
      variants={showSuccessAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="success__modal"
    >
      <p>{children}</p>
    </motion.dialog>
  );
};
