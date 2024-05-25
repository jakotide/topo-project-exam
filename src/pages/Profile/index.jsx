import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import { Loader } from "../../components/ui/LoadingSpinner";
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
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("user");
    localStorage.removeItem("venueManager");
    navigate("/login");
  };

  const handleVenueCreated = (venue) => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <Loader />;
  }

  return (
    <section className="profile-page">
      <div className="profile__avatar__container">
        <h1>{profile.data.name}</h1>
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
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="create__logout__container">
        <p>Got a venue to list out?</p>
        <CreateVenueModal onVenueCreated={handleVenueCreated} apiKey={apiKey} />

        <AnimatePresence>
          {showSuccess && (
            <SuccessModal>
              Success! Refresh page to see your venue.
            </SuccessModal>
          )}
        </AnimatePresence>
      </div>

      <div>
        <ManagedVenues token={token} apiKey={apiKey} profileName={name} />
      </div>
      <div>
        <BookedVenues />
      </div>
    </section>
  );
};
