import "./LinkItem.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slide } from "../animation";

export const LinkItem = ({ data, closeMenu }) => {
  const { title, to, index } = data;

  const handleClick = () => {
    closeMenu();
  };

  return (
    <motion.div
      variants={slide}
      animate="enter"
      initial="initial"
      exit="exit"
      custom={index}
    >
      <Link className="nav__links" to={to} onClick={handleClick}>
        {title}
      </Link>
    </motion.div>
  );
};
