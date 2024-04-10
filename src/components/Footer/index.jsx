import "./Footer.scss";
import { motion } from "framer-motion";
import { useState } from "react";

export const Footer = ({ className }) => {
  const [isHover, setIsHover] = useState(false);
  const subHover = {
    hidden: {
      y: 0,
    },
    visible: {
      y: "-60px",
    },
  };
  return (
    <footer className={className}>
      <div className="footer__body">
        <div className="footer__upper">
          <div className="footer__left">
            <div className="footer__logo">TOPO</div>
            <form action="" className="footer__newsletter">
              <label htmlFor="email">Subscribe to our newsletter!</label>
              <div className="input__container">
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email ..."
                  required
                  autoComplete="true"
                />
                <button
                  type="submit"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  <div className="button__text">Subscribe</div>
                  <motion.div
                    className="hover__button"
                    variants={subHover}
                    initial="hidden"
                    animate={isHover ? "visible" : ""}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  ></motion.div>
                </button>
              </div>
            </form>
          </div>
          <div className="footer__right">
            <div className="footer__list">
              <div>Socials</div>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
            </div>
            <div className="footer__list">
              <div>About Us</div>
              <div>Contact</div>
            </div>
            <div className="footer__list">
              <div>Career</div>
              <div>FAQ</div>
            </div>
          </div>
        </div>
        <div className="footer__lower">
          <div>Jakob Tidemand</div>
          <div>&#169;2024</div>
        </div>
      </div>
    </footer>
  );
};
