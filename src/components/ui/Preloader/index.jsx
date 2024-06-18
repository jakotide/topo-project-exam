import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.scss";
import { slideLeft, slideRight, headerAnim } from "./anim";

export const Preloader = () => {
  return (
    <div className="preloader__container">
      <motion.div
        className="preloader__header"
        variants={headerAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        key="header"
      >
        TOPO
      </motion.div>

      <motion.div
        className="preloader__block red"
        variants={slideLeft}
        initial="initial"
        animate="animate"
      ></motion.div>
      <motion.div
        className="preloader__block blue"
        variants={slideRight}
        initial="initial"
        animate="animate"
      ></motion.div>
      <motion.div
        className="preloader__block green"
        variants={slideLeft}
        initial="initial"
        animate="animate"
      ></motion.div>
      <motion.div
        className="preloader__block white"
        variants={slideRight}
        initial="initial"
        animate="animate"
      ></motion.div>
    </div>
  );
};
