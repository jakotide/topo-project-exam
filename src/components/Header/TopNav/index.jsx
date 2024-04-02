import "./TopNav.scss";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { topNavSlide } from "../animation";
import { topNavLinks } from "../Data";
import { Link } from "react-router-dom";

export const TopNav = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView]);

  return (
    <nav className="top__nav__container" ref={ref}>
      <motion.menu className="top__nav">
        {topNavLinks.map((data, index) => (
          <motion.div
            key={index}
            variants={topNavSlide}
            initial="hidden"
            animate={mainControls}
            exit="hidden"
            ref={ref}
            custom={index}
          >
            <Link to={data.to} className="top__nav__link">
              {data.title}
            </Link>
          </motion.div>
        ))}
      </motion.menu>
    </nav>
  );
};
