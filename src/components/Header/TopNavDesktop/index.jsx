import "./TopNav.scss";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { topNavSlide, navLinkScale, arrowLinkUp } from "../animation";
import { topNavLinks } from "../Data";
import { Link, useLocation } from "react-router-dom";
import arrowUp from "../../../assets/icons/arrow-up-white.png";

export const TopNav = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isHovered, setIsHovered] = useState(null);
  const location = useLocation();
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
              className={`top__nav__link ${
                location.pathname === data.to ? "active" : ""
              }`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.div
                className={`link__arrow__circle ${
                  location.pathname === data.to ? "active" : ""
                }`}
                variants={navLinkScale}
                initial="normal"
                animate={
                  isHovered === index && location.pathname !== data.to
                    ? "hovered"
                    : "normal"
                }
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
