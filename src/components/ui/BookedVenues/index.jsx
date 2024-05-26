import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getBookings } from "../../../api/getBookings";
import { deleteBooking } from "../../../api/deleteBooking";
import { useToken, useApiKey } from "../../../hooks/useStore";
import { Link } from "react-router-dom";
import "./BookedVenues.scss";

export const BookedVenues = () => {
  const dialogRefs = useRef(null);
  const token = useToken();
  const apiKey = useApiKey();
  const { name } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !apiKey) {
        return;
      }

      try {
        const bookings = await getBookings(name, token, apiKey);
        setBookings(bookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, apiKey, name]);

  const handleDeleteVenue = async (bookingId) => {
    try {
      await deleteBooking(bookingId, token, apiKey);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="booked__venues">
      {bookings.length === 0 ? (
        <p>You have no bookings</p>
      ) : (
        <ul>
          <h2 className="managed__h2">Your Bookings:</h2>
          {bookings.map((booking) => (
            <li key={booking.id} className="venue-item">
              <Link
                to={`/venues/${booking.venue.id}`}
                className="managed__link"
              >
                <div className="image__name__container">
                  <img
                    src={booking.venue.media[0]?.url}
                    alt={booking.venue.media[0]?.alt || booking.name}
                    className="venue-avatar"
                  />
                  <span className="managed__venue__name">
                    {booking.venue.name}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => handleDeleteVenue(booking.id)}
                className="delete__venue__btn"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
