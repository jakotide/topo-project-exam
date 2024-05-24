import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "../../api/profile";
import {
  useToken,
  useUser,
  useUserActions,
  useApiKey,
} from "../../hooks/useStore";
import { useFetchApiKey } from "../../hooks/useFetchApiKey";
import { CreateVenueModal, ManagedVenues } from "../../components/ui/";
import { BookedVenues } from "../../components/ui/BookedVenues";
import { SuccessModal } from "../../components/ui/SuccessModal";
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
  const { error: apiKeyError } = useFetchApiKey();
  const [showSuccess, setShowSucccess] = useState(false);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("user");
    localStorage.removeItem("venueManager");
    navigate("/login");
  };

  const handleVenueCreated = (venue) => {
    console.log("Venue created:", venue);
    setShowSucccess(true);
    setTimeout(() => {
      setShowSucccess(false);
    }, 3000);
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
  }, [token, name, apiKey, apiKeyError]);

  if (!token) {
    return navigate("/login");
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

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
      {profile.data.bio ? (
        <div>{profile.data.bio}</div>
      ) : (
        <div>{`${profile.data.name} has not written a bio.`}</div>
      )}
      <CreateVenueModal onVenueCreated={handleVenueCreated} apiKey={apiKey} />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <AnimatePresence>{showSuccess && <SuccessModal />}</AnimatePresence>
      <div>
        <ManagedVenues token={token} apiKey={apiKey} profileName={name} />
        <BookedVenues />
      </div>
    </section>
  );
};
