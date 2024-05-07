export const contactBoxReveal = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const combinedVariants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
