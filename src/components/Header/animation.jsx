import { easeIn } from "framer-motion";

export const menuSlide = {
  initial: { x: "100%" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "100%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};
export const slide = {
  initial: { x: 80 },
  enter: (i) => ({
    x: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i },
  }),
  exit: (i) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i },
  }),
};

export const circle = {
  hidden: {
    y: "0%",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
  visible: {
    y: "-100%",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
  },
};

export const buttonScale = {
  hidden: {
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
    scale: 0,
  },
  visible: {
    transition: { duration: 0.2, ease: [0.76, 0, 0.24, 1] },
    scale: 1,
  },
  exit: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};

export const topNavSlide = {
  hidden: {
    transition: { duration: 0.3, ease: easeIn },
    y: "-150%",
  },
  visible: (index) => ({
    transition: { delay: 0.05 * index, ease: easeIn },
    y: "0%",
  }),
};
