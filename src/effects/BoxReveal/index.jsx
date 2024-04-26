import "./BoxReveal.scss";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const BoxReveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView]);

  return (
    <div className="boxbox" ref={ref}>
      <div className="slider__container">
        <motion.div
          className="slider__box"
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          animate={mainControls}
          exit="hidden"
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
      {children}
    </div>
  );
};
