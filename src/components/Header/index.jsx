import "./Header.scss";
import { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { TopNav } from "./TopNav";
import { ProfileButton } from "./ProfileButton";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { circle, buttonScale } from "./animation";
import { MagneticEffect } from "../../effects/MagneticEffect";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  // const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBtn(scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
  }, [isActive]);

  // useEffect(() => {
  //   document.body.style.overflow = isHover ? "hidden" : "";
  // }, [isHover]);

  const handeCloseMenu = () => {
    setIsActive(false);
  };

  return (
    <header>
      <Logo />
      <div></div>
      <TopNav />
      <ProfileButton />
      <AnimatePresence>
        {showBtn && (
          <MagneticEffect>
            <motion.button
              variants={buttonScale}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`${isActive ? "buttonActive" : ""}`}
              onClick={() => {
                setIsActive(!isActive);
              }}
              // onMouseEnter={() => setIsHover(!isHover)}
              // onMouseLeave={() => isHover}
            >
              <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
              <motion.div
                className="circle"
                animate={isActive ? "visible" : "hidden"}
                variants={circle}
              ></motion.div>
            </motion.button>
          </MagneticEffect>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            <Nav closeMenu={handeCloseMenu} />
            <motion.div
              className="nav__overlay"
              variants={{
                start: { opacity: 0 },
                end: { opacity: 0.5 },
              }}
              initial="start"
              animate="end"
              exit="start"
              transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
