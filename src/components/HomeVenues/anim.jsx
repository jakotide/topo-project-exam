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

export const customVariantMoreButton = {
  normal: {
    x: "-28px",
  },
  active: {
    x: "26px",
  },
};

export const variantsBrowseButton = {
  normal: {
    x: "-32px",
  },
  active: {
    x: "29px",
  },
};
