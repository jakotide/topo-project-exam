import React, { useState, useEffect, useRef } from "react";
import { getManagedVenues } from "../../../api/getManagedVenues";
import { EditVenueModal } from "../EditVenueModal";
import { deleteVenue } from "../../../api/deleteVenue";
import { SuccessModal } from "../SuccessModal";
import "./ManagedVenues.scss";
import { Link } from "react-router-dom";

export const ManagedVenues = ({ token, apiKey, profileName }) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showSucces, setShowSucces] = useState(false);
  const dialogRef = useRef(null);

  const handleVenueUpdated = (updatedVenue) => {
    setShowSucces(true);
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      await deleteVenue(venueId, token, apiKey);
      handleVenueUpdated();
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  const openDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
    document.body.classList.add("modal-open");
  };

  const closeDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    document.body.classList.remove("modal-open");
  };

  const handleDialogClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeDialog();
    }
  };

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.addEventListener("click", handleDialogClick);
      return () => {
        dialogElement.removeEventListener("click", handleDialogClick);
      };
    }
  }, []);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (venues.length === 0) {
    return <div>No venues found.</div>;
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

            <EditVenueModal
              isOpen={selectedVenue === venue}
              onClose={() => setSelectedVenue(null)}
              apiKey={apiKey}
              venue={venue}
              onVenueUpdated={handleVenueUpdated}
            />
            <button onClick={openDialog} className="delete__venue__btn">
              Delete
            </button>
            <dialog ref={dialogRef}>
              <p>Delete this venue?</p>
              <div>
                <button onClick={() => handleDeleteVenue(venue.id)}>Yes</button>
                <button onClick={closeDialog}>Cancel</button>
              </div>
            </dialog>
          </li>
        ))}
      </ul>

      {showSucces && <SuccessModal></SuccessModal>}
    </div>
  );
};
