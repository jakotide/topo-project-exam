import "./Header.scss";
import { useState } from "react";
import { Nav } from "./Nav";
import { AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header>
      <div>TOPO</div>
      <button
        className={`${isActive ? "buttonActive" : ""}`}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
      </button>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </header>
  );
};
