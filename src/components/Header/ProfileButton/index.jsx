import "./ProfileButton.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Reveal } from "../../../effects/Reveal";
import userIcon from "../../../assets/icons/user-white.png";

export const ProfileButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const { name, accessToken } = parsedUserData;
      if (accessToken) {
        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Reveal>
      <div className="profile__btn__container">
        <Link
          to={isLoggedIn ? `/profiles/${userName}` : "/login"}
          // to={isLoggedIn ? `/profiles` : "/login"}
          className={`profile__btn ${!isLoggedIn ? "disabled" : ""}`}
        >
          {isLoggedIn ? "Profile" : "Login"}
          <img src={userIcon} alt="User icon" className="user__icon" />
        </Link>
      </div>
    </Reveal>
  );
};
