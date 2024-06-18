import { animate, easeOut } from "framer-motion";

export const slideLeft = {
  initial: {
    x: "0%",
  },
  animate: {
    x: "-100%",
    transition: { duration: 1, ease: easeOut, delay: 1.6 },
  },
};

export const slideRight = {
  initial: {
    x: "0%",
  },
  animate: {
    x: "100%",
    transition: { duration: 1, ease: easeOut, delay: 1.6 },
  },
};

export const headerAnim = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,

    transition: { duration: 0.5, ease: easeOut, delay: 1 },
  },
};
