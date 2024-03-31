import "./Header.scss";
import { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { TopNav } from "./TopNav";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { circle, buttonScale } from "./animation";
import { MagneticEffect } from "../MagneticEffect";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBtn(scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <Logo />
      <TopNav />
      <AnimatePresence>
        {showBtn && (
          <MagneticEffect>
            <motion.button
              variants={buttonScale}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`${isActive ? "buttonActive" : ""}`}
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
              <motion.div
                className="circle"
                animate={isActive ? "visible" : "hidden"}
                variants={circle}
              ></motion.div>
            </motion.button>
          </MagneticEffect>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </header>
  );
};
