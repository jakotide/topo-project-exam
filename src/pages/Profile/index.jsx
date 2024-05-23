import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../../api/profile";
import {
  useToken,
  useUser,
  useUserActions,
  useApiKey,
  // Import the hook to fetch apiKey
} from "../../hooks/useStore";
import { useFetchApiKey } from "../../hooks/useFetchApiKey";
import { CreateVenueModal } from "../../components/ui/CreateVenueModal";
import "./Profile.scss";

export const ProfilePage = () => {
  const { name } = useParams();
  const token = useToken();
  const user = useUser();
  const apiKey = useApiKey();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { clearUser } = useUserActions();
  const navigate = useNavigate();
  const { error: apiKeyError } = useFetchApiKey(); // Fetch apiKey

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("user");
    localStorage.removeItem("venueManager");
    navigate("/login");
  };

  const handleVenueCreated = (venue) => {
    console.log("Venue created:", venue);
    // You can add logic to update the UI with the new venue data here
  };

  useEffect(() => {
    if (apiKeyError) {
      setError(apiKeyError);
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token, apiKey, name);
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && name && apiKey) {
      fetchProfile();
    }
  }, [token, name, apiKey, apiKeyError]); // Ensure apiKeyError is included in the dependency array

  if (!token) {
    return navigate("/login");
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  console.log(profile);

  return (
    <section className="profile-page">
      <h1>{profile.data.name}'s Profile</h1>

      <img
        className="profile-avatar"
        src={profile.data.avatar.url}
        alt={`${profile.data.name}'s avatar`}
      />
      {profile.data.venueManager ? (
        <div className="profile__tag">Venue Manager</div>
      ) : (
        <div className="profile__tag">Customer</div>
      )}
      <p>Email: {profile.data.email}</p>
      {profile.bio ? (
        <div>{profile.data.bio}</div>
      ) : (
        <div>{`${profile.data.name} has not written a bio.`}</div>
      )}
      <CreateVenueModal onVenueCreated={handleVenueCreated} />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </section>
  );
};
