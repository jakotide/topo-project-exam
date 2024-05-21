// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../hooks/useStore";
// import { useProfile } from "../../hooks/useProfile";

// export const ProfilePage = () => {
//   const { user, token } = useUser();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       setIsLoading(true);
//       setIsError(false);

//       try {
//         if (!user || !token) {
//           throw new Error("User data or token not available");
//         }

//         const profileData = await useProfile(token, user.name);
//         setProfile(profileData);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [user, token]);

//   const handleLogout = () => {
//     // Handle logout logic
//   };

//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error fetching profile data</p>;
//   }

//   return (
//     <section>
//       <div>
//         {/* Render profile data */}
//         <h1>{profile?.name}</h1>
//         <p>{profile?.email}</p>
//         {/* Add rendering logic for other profile details */}
//       </div>
//       <button onClick={handleLogout}>Logout</button>
//     </section>
//   );
// };

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.scss";

export const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.name === username) {
        setUser(parsedUserData);
      } else {
        // Handle case where the profile doesn't match the logged-in user
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("venueManager");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {user.name}</h1>
      <img
        src={user.avatar.url}
        alt={user.avatar.alt}
        className="profile-avatar"
      />
      <p>Email: {user.email}</p>
      <p>Venue Manager: {user.venueManager ? "Yes" : "No"}</p>
      {/* Add more user details as needed */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};
