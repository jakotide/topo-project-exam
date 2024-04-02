import "./ProfileButton.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "../../../effects/Reveal";

export const ProfileButton = () => {
  return (
    // <motion.div
    // >
    <Reveal>
      <Link to="/" className="profile__btn">
        Profile
      </Link>
    </Reveal>

    // </motion.div>
  );
};
