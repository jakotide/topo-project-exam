import React, { useState, useEffect } from "react";
import { getManagedVenues } from "../../../api/getManagedVenues";
import "./ManagedVenues.scss";

export const ManagedVenues = ({ token, apiKey, profileName }) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

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
    <div className="managed-venues">
      <h2>Managed Venues</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id} className="venue-item">
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt || venue.name}
              className="venue-avatar"
            />
            <span>{venue.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
