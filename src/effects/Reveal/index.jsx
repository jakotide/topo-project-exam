import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./Reveal.scss";

export const Reveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();
  // const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      // slideControls.start("visible");
    } else {
      mainControls.start("hidden");
      // slideControls.start("hidden");
    }
  }, [isInView]);

  return (
    <div className="reveal__container" ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        exit="hidden"
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        {children}
      </motion.div>
      {/* <motion.div
        className="slider__box"
        variants={{
          hidden: { right: 0 },
          visible: { right: 100 },
        }}
        initial="hidden"
        animate={slideControls}
        exit="hidden"
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.5 }}
      /> */}
    </div>
  );
};
