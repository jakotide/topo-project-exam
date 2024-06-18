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
  className,
  arrowFillColor,
  variants,
  ...rest
}) => {
  const [isHover, setIsHover] = useState(false);
  const buttonVariants = {
    normal: {
      x: "-24px",
    },
    active: {
      x: "25px",
    },
  };

  const buttonReveal = {
    initial: {
      opacity: 0,
      y: "20px",
    },
    animate: {
      opacity: 1,
      y: "0",
      transition: { duration: 0.4, delay: 2.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div className={className}>
      <Link to={to} className="button__link">
        <motion.button
          {...rest}
          style={style}
          className="button__component"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          variants={buttonReveal}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={variants || buttonVariants}
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
            variants={variants || buttonVariants}
            initial="normal"
            animate={isHover ? "active" : "normal"}
          >
            {children}
          </motion.div>
          <motion.div
            variants={variants || buttonVariants}
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
        </motion.button>
      </Link>
    </motion.div>
  );
};
