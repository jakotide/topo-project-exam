import "./TopNav.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { topNavSlide } from "../animation";

export const TopNav = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  return (
    <nav className="top__nav__container">
      <motion.menu
        variants={topNavSlide}
        initial="hidden"
        animate={isInView ? "visible" : ""}
        className="top__nav"
        ref={ref}
      >
        <li>Contact</li>
        <li>Venues</li>
        <li>Login</li>
      </motion.menu>
    </nav>
  );
};
