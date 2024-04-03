import "./LinkItem.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slide } from "../animation";
import arrowRight from "../../../assets/icons/arrow-right-white.png";

export const LinkItem = ({ data, closeMenu }) => {
  const { title, to, index } = data;
  const [isHover, setIsHover] = useState(false);

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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <motion.img
        variants={{
          hidden: { x: "-25px" },
          visible: { x: "0px" },
        }}
        initial="hidden"
        animate={isHover ? "visible" : "hidden"}
        src={arrowRight}
        alt="arrow right icon"
        className="hidden-arrow"
      />

      <Link className="nav__links" to={to} onClick={handleClick}>
        {title}
      </Link>
    </motion.div>
  );
};
