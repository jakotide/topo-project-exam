// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { CreateVenueModal } from "../../components/ui/CreateVenueModal";
// import "./Profile.scss";

// export const ProfilePage = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const handleVenueCreated = (venue) => {
//     console.log("Venue created:", venue);
//     // You can add logic to update the UI with the new venue data here
//   };

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const parsedUserData = JSON.parse(userData);
//       if (parsedUserData.name === username) {
//         setUser(parsedUserData);
//       } else {
//         navigate("/login");
//       }
//     } else {
//       navigate("/login");
//     }
//   }, [username, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("venueManager");
//     window.dispatchEvent(new Event("storage"));
//     navigate("/login");
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-page">
//       <h1>Welcome, {user.name}</h1>
//       <img
//         src={user.avatar.url}
//         alt={user.avatar.alt}
//         className="profile-avatar"
//       />
//       <p>Email: {user.email}</p>
//       <p>Venue Manager: {user.venueManager ? "Yes" : "No"}</p>
//       {/* Add more user details as needed */}

//       <CreateVenueModal onVenueCreated={handleVenueCreated} />
//       <button onClick={handleLogout} className="logout-button">
//         Logout
//       </button>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProfile } from "../../api/profile";
import { useToken, useUser } from "../../hooks/useStore";
import "./Profile.scss";

export const ProfilePage = () => {
  const { name } = useParams();
  const token = useToken();
  const user = useUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token, name);
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && name) {
      fetchProfile();
    }
  }, [token, name]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section className="profile-page">
      <h1>{profile.name}'s Profile</h1>
      <img
        className="profile-avatar"
        src={profile.avatar}
        alt={`${profile.name}'s avatar`}
      />

      {profile.venueManager ? (
        <div className="profile__tag">Venue Manager</div>
      ) : (
        <div className="profile__tag">Customer</div>
      )}

      <p>Email: {profile.email}</p>
      {profile.bio ? (
        <div>{profile.bio}</div>
      ) : (
        <div>{`${profile.name} has not written a bio.`}</div>
      )}
    </section>
  );
};
