import "./Button.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowRightSvg from "../../assets/icons/arrow-right_1.svg";
import { useState } from "react";

export const Button = ({ children, to, style, arrowColor, ...rest }) => {
  const [isHover, setIsHover] = useState(false);
  const variants = {
    normal: {
      x: "-24px",
    },
    active: {
      x: "25px",
    },
  };

  return (
    <motion.div>
      <Link to={to} className="button__link">
        <button
          {...rest}
          style={style}
          className="button__component"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <motion.svg
            fill="white"
            style={{ fill: "white" }}
            src={ArrowRightSvg}
            alt=""
            variants={variants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          />
          <motion.div
            variants={variants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          >
            {children}
          </motion.div>
          <motion.svg
            style={{ fill: arrowColor }}
            src={ArrowRightSvg}
            alt=""
            variants={variants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          />
        </button>
      </Link>
    </motion.div>
  );
};
