import { navLinks, footerLinks } from "../Data";
import { LinkItem } from "../LinkItem";
import "./Nav.scss";
import { menuSlide } from "../animation";
import { motion } from "framer-motion";

export const Nav = ({ closeMenu }) => {
  return (
    <motion.nav
      className="button__nav"
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="nav__content">
        <div className="nav__header">Menu</div>
        <menu>
          {navLinks.map((data, index) => (
            <LinkItem
              key={index}
              data={{ ...data, index }}
              closeMenu={closeMenu}
            />
          ))}
        </menu>
        <div className="nav__footer">
          {footerLinks.map((data, index) => (
            <div key={index}>{data.title}</div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};
