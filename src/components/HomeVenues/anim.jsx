export const slideUp = {
  initial: {
    y: "100%",
  },
  active: (i) => ({
    y: "0",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

export const widthReveal = {
  initial: {
    width: "100",
  },
  active: {
    width: "0",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100",
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

export const MoreButton = {
  normal: {
    x: "-28px",
  },
  active: {
    x: "26px",
  },
};

export const BrowseButton = {
  normal: {
    x: "-32px",
  },
  active: {
    x: "29px",
  },
};
