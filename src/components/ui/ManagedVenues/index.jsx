import React, { useState, useEffect, useRef } from "react";
import { getManagedVenues } from "../../../api/getManagedVenues";
import { EditVenueModal } from "../EditVenueModal";
import { deleteVenue } from "../../../api/deleteVenue";
import { SuccessModal } from "../SuccessModal";
import "./ManagedVenues.scss";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const ManagedVenues = ({ token, apiKey, profileName }) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);
  const dialogRef = useRef(null);

  const handleVenueUpdated = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      await deleteVenue(venueId, token, apiKey);
      handleVenueUpdated();
      closeDialog();
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  const openDialog = (venueId) => {
    setVenueToDelete(venueId);
    setIsDialogOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setVenueToDelete(null);
    document.body.classList.remove("modal-open");
  };

  const handleDialogClick = (e) => {
    const dialog = dialogRef.current;
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeDialog();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isDialogOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isDialogOpen]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesData = await getManagedVenues(token, apiKey, profileName);
        setVenues(venuesData.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && apiKey && profileName) {
      fetchVenues();
    }
  }, [token, apiKey, profileName]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("click", handleDialogClick);
      return () => {
        dialog.removeEventListener("click", handleDialogClick);
      };
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (venues.length === 0) {
    return <div className="managed__venues__container">No venues found.</div>;
  }

  return (
    <div className="managed__venues__container">
      <h2 className="managed__h2">Your venues:</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id} className="venue-item">
            <Link to={`/venues/${venue.id}`} className="managed__link">
              <div className="image__name__container">
                <img
                  src={venue.media[0]?.url}
                  alt={venue.media[0]?.alt || venue.name}
                  className="venue-avatar"
                />
                <span className="managed__venue__name">{venue.name}</span>
              </div>
            </Link>
            <div className="venue__button__container">
              <EditVenueModal
                isOpen={selectedVenue === venue}
                onClose={() => setSelectedVenue(null)}
                apiKey={apiKey}
                venue={venue}
                onVenueUpdated={handleVenueUpdated}
              />
              <button
                onClick={() => openDialog(venue.id)}
                className="delete__venue__btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isDialogOpen && (
        <dialog ref={dialogRef} className="dialog__element">
          <form method="dialog">
            <p>Delete this venue?</p>
            <menu>
              <button
                type="button"
                onClick={() => handleDeleteVenue(venueToDelete)}
              >
                Yes
              </button>
              <button type="button" onClick={closeDialog}>
                Cancel
              </button>
            </menu>
          </form>
        </dialog>
      )}

      <AnimatePresence>
        {showSuccess && (
          <SuccessModal>Success! Refresh page to see update.</SuccessModal>
        )}
      </AnimatePresence>
    </div>
  );
};
