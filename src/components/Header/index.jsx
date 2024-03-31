import "./Header.scss";
import { useState, useRef } from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { AnimatePresence, easeIn } from "framer-motion";
import { motion } from "framer-motion";
import { circle } from "./animation";
import { MagneticEffect } from "../MagneticEffect";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header>
      <Logo />
      <nav>
        <menu className="top__nav">
          <li>Contact</li>
          <li>Venues</li>
          <li>Login</li>
        </menu>
      </nav>
      <MagneticEffect>
        <button
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
        </button>
      </MagneticEffect>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </header>
  );
};
