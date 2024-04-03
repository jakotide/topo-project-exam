import "./LinkItem.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slide } from "../animation";
import arrowUpRight from "../../../assets/icons/arrow-up-white.png";

export const LinkItem = ({ data, closeMenu }) => {
  const { title, to, index } = data;

  const handleClick = () => {
    closeMenu();
  };

  return (
    <motion.div
      className="link__container"
      variants={slide}
      animate="enter"
      initial="initial"
      exit="exit"
      custom={index}
    >
      <Link className="nav__links" to={to} onClick={handleClick}>
        {title}
      </Link>
      <img src={arrowUpRight} alt="arrow right icon" />
    </motion.div>
  );
};
