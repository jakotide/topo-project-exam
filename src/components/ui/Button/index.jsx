import "./Button.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightSvg } from "../ArrowRightSvg";
import { useState } from "react";

export const Button = ({
  children,
  to,
  style,
  options,
  arrowFillColor,
  ...rest
}) => {
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
          <motion.div
            variants={variants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          >
            <ArrowRightSvg
              options={{
                width: "24px",
                height: "24px",
                fill: arrowFillColor,
              }}
            />
          </motion.div>
          <motion.div
            variants={variants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          >
            {children}
          </motion.div>
          <motion.div
            variants={variants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          >
            <ArrowRightSvg
              options={{
                width: "24px",
                height: "24px",
                fill: arrowFillColor,
              }}
            />
          </motion.div>
        </button>
      </Link>
    </motion.div>
  );
};