import "./Header.scss";
import { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { TopNav } from "./TopNavDesktop";
import { TopNavMobile } from "./TopNavMobile";
import { ProfileButton } from "./ProfileButton";
import { AnimatePresence, motion } from "framer-motion";
import { circle, buttonScale } from "./animation";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const isMobile = useMediaQuery("(max-width: 48em)");

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

  const handeCloseMenu = () => {
    setIsActive(false);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <header>
        <Logo />
        {isMobile ? (
          <TopNavMobile toggleMenu={toggleMenu} isActive={isActive} />
        ) : (
          <>
            <TopNav />
          </>
        )}
        <AnimatePresence>
          {showBtn && (
            <motion.button
              variants={buttonScale}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="side__nav__button"
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <div className={`burger ${isActive ? "burgerActive" : ""}`}>
                <span aria-hidden="true" className="hidden">
                  Hidden
                </span>
              </div>
              <motion.div
                className="circle"
                animate={isActive ? "visible" : "hidden"}
                variants={circle}
              ></motion.div>
            </motion.button>
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
    </>
  );
};
