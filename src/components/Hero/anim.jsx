import { easeOut } from "framer-motion";

export const cloudPath = {
  start: { x: "-100%" },
  end: { x: "100%" },
  transition: {
    repeat: Infinity,
    ease: "linear",
    duration: 10,
  },
};

export const headerReveal = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.9, delay: 2.2, ease: [0.76, 0, 0.24, 1] },
  },
};
