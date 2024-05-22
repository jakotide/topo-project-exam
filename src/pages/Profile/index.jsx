import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreateVenueModal } from "../../components/ui/CreateVenueModal";
import "./Profile.scss";

export const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleVenueCreated = (venue) => {
    console.log("Venue created:", venue);
    // You can add logic to update the UI with the new venue data here
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.name === username) {
        setUser(parsedUserData);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("venueManager");
    window.dispatchEvent(new Event("storage"));
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

      <CreateVenueModal onVenueCreated={handleVenueCreated} />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};
