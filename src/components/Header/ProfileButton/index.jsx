import "./ProfileButton.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "../../../effects/Reveal";
import userIcon from "../../../assets/icons/user-white.png";

export const ProfileButton = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Reveal>
      <div
        className="profile__btn__container"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link to="/login" className="profile__btn">
          Profile
          <div>
            <img src={userIcon} alt="User icon" className="user__icon" />
            <motion.div
              className="circle__profile__hover"
              variants={{
                hidden: { y: 0 },
                visible: { y: "-40px" },
                exit: { y: "40px" },
              }}
              initial="hidden"
              exit="exit"
              animate={isHover ? "visible" : "hidden"}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              Profile
              <img src={userIcon} alt="User icon" className="user__icon" />
            </motion.div>
          </div>
        </Link>
      </div>
    </Reveal>
  );
};
