import { useState } from "react";
import "./TopNavMobile.scss";
import { motion } from "framer-motion";

export const TopNavMobile = ({ toggleMenu, isActive }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggleMenu = () => {
    toggleMenu();
    setIsClicked(!isClicked);
  };

  return (
    <div className="mobile__menu" onClick={handleToggleMenu}>
      <div className="mobile__menu__dot"></div>
      <button className="mobile__menu">Menu</button>
      <motion.button
        className="mobile__close"
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <div className="x"></div>
      </motion.button>
    </div>
  );
};
