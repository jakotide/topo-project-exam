export const slideLeft = {
  initial: {
    x: "0%",
  },
  animate: {
    x: "-100%",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.6 },
  },
};

export const slideRight = {
  initial: {
    x: "0%",
  },
  animate: {
    x: "100%",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1.6 },
  },
};

export const headerAnim = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,

    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 1 },
  },
};
