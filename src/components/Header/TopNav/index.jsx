import "./TopNav.scss";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { topNavSlide, navLinkScale, arrowLinkUp } from "../animation";
import { topNavLinks } from "../Data";
import { Link } from "react-router-dom";
import arrowUp from "../../../assets/icons/arrow-up-white.png";

export const TopNav = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isHovered, setIsHovered] = useState(null); // Changed initial state to null

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
            custom={index}
          >
            <Link
              to={data.to}
              className="top__nav__link"
              onMouseEnter={() => setIsHovered(index)} // Set index on hover
              onMouseLeave={() => setIsHovered(null)} // Reset to null on hover out
            >
              <motion.div
                className="link__arrow__circle"
                variants={navLinkScale}
                initial="normal"
                animate={isHovered === index ? "hovered" : "normal"} // Apply animation based on index
                exit="normal"
              >
                <motion.img
                  className="arrow__up"
                  src={arrowUp}
                  alt="arrow right icon"
                  variants={arrowLinkUp}
                  initial="hidden"
                  animate={isHovered === index ? "visible" : "hidden"}
                />
              </motion.div>
              {data.title}
            </Link>
          </motion.div>
        ))}
      </motion.menu>
    </nav>
  );
};
