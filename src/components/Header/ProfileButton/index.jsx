import "./ProfileButton.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "../../../effects/Reveal";
import userIcon from "../../../assets/icons/user-white.png";

// export const ProfileButton = () => {
//   const [isHover, setIsHover] = useState(false);
//   const [usersAccessToken, setUsersAccessToken] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     setUsersAccessToken(token);
//   }, []);

//   return (
//     <Reveal>
//       <div
//         className="profile__btn__container"
//         onMouseEnter={() => setIsHover(true)}
//         onMouseLeave={() => setIsHover(false)}
//       >
//         <Link
//           to={usersAccessToken ? "/profile" : "/login"}
//           className="profile__btn"
//         >
//           {usersAccessToken ? "Profile" : "Login"}
//           <div>
//             <img src={userIcon} alt="User icon" className="user__icon" />
//             <motion.div
//               className="circle__profile__hover"
//               variants={{
//                 hidden: { y: 0 },
//                 visible: { y: "-40px" },
//                 exit: { y: "40px" },
//               }}
//               initial="hidden"
//               exit="exit"
//               animate={isHover ? "visible" : "hidden"}
//               transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
//             >
//               {usersAccessToken ? "Profile" : "Login"}
//               <img src={userIcon} alt="User icon" className="user__icon" />
//             </motion.div>
//           </div>
//         </Link>
//       </div>
//     </Reveal>
//   );
// };

import { useUser } from "../../../hooks/useStore";
import { useUserStore } from "../../../hooks/useStore";
export const ProfileButton = () => {
  const [isHover, setIsHover] = useState(false);
  // const { isLoggedIn } = useUser();
  const { user, isLoggedIn } = useUser();

  return (
    <Reveal>
      <div
        className="profile__btn__container"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link
          to={isLoggedIn ? `/profiles/${user.name}` : "/login"}
          className="profile__btn"
        >
          {isLoggedIn ? "Profile" : "Login"}
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
              {isLoggedIn ? "Profile" : "Login"}
              <img src={userIcon} alt="User icon" className="user__icon" />
            </motion.div>
          </div>
        </Link>
      </div>
    </Reveal>
  );
};
