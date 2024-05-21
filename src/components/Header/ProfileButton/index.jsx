// import "./ProfileButton.scss";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import { Reveal } from "../../../effects/Reveal";
// import userIcon from "../../../assets/icons/user-white.png";

// export const ProfileButton = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");

//     if (userData) {
//       const parsedUserData = JSON.parse(userData);
//       const { name, accessToken } = parsedUserData;
//       if (accessToken) {
//         setIsLoggedIn(true);
//         setUserName(name);
//       } else {
//         setIsLoggedIn(false);
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   return (
//     <Reveal>
//       <div className="profile__btn__container">
//         <Link
//           to={isLoggedIn ? `/profiles/${userName}` : "/login"}
//           // to={isLoggedIn ? `/profiles` : "/login"}
//           className={`profile__btn ${!isLoggedIn ? "disabled" : ""}`}
//         >
//           {isLoggedIn ? "Profile" : "Login"}
//           <img src={userIcon} alt="User icon" className="user__icon" />
//         </Link>
//       </div>
//     </Reveal>
//   );
// };
import "./ProfileButton.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../../../effects/Reveal";
import userIcon from "../../../assets/icons/user-white.png";

export const ProfileButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : null
  );

  useEffect(() => {
    const checkUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const { name } = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    };

    // Initial check
    checkUserData();

    // Listen for storage events
    window.addEventListener("storage", checkUserData);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

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
