import "./Logo.scss";
import { Link } from "react-router-dom";
import { easeIn, motion } from "framer-motion";

export const Logo = ({}) => {
  const text = "OPO";
  const staggerAnimation = {
    hidden: { opacity: 0, x: -20, duration: 1, ease: easeIn },
    visible: { opacity: 1, x: 0, duration: 1, ease: easeIn, delay: 0.8 },
  };

  return (
    <Link className="nav__logo">
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05 }}
      >
        T
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={staggerAnimation}
            className="characters"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Link>
  );
};
