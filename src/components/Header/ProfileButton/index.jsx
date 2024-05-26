import "./ProfileButton.scss";
import { Link } from "react-router-dom";
import { Reveal } from "../../../effects/Reveal";
import userIcon from "../../../assets/icons/user-white.png";
import { useUser } from "../../../hooks/useStore";

export const ProfileButton = () => {
  const user = useUser();
  const isLoggedIn = Boolean(user);
  const userName = user ? user.name : null;

  return (
    <Reveal>
      <div className="profile__btn__container">
        <Link
          to={isLoggedIn ? `/profiles/${userName}` : "/login"}
          className={`profile__btn ${!isLoggedIn ? "disabled" : ""}`}
        >
          {isLoggedIn ? "Profile" : "Login"}
          <img src={userIcon} alt="User icon" className="user__icon" />
        </Link>
      </div>
    </Reveal>
  );
};
