// import React, { useEffect, useState } from "react";
// import { getBookings } from "../../../api/getBookings";
// import { useToken, useUserActions, useApiKey } from "../../../hooks/useStore";
// import "./BookedVenues.scss";

// export const BookedVenues = ({ token, apiKey, profileName }) => {
//   //   const token = useToken();
//   //   const apiKey = useApiKey();
//   //   const { user } = useUserActions();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await getBookings(token, apiKey, profileName);
//         if (!response.ok) {
//           throw new Error("Failed to fetch bookings");
//         }
//         const data = await response.json();
//         console.log("Data:", data); // Log fetched data
//         setBookings(data.data);
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (err) {
//         console.error("Error fetching bookings:", err.message); // Log any errors
//         setError(err.message);
//         setLoading(false); // Set loading to false if an error occurs
//       }
//     };

//     if (token && apiKey && profileName) {
//       fetchBookings();
//     }
//   }, [token, apiKey, profileName]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="booked-venues">
//       <h2>Your Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>You have no bookings.</p>
//       ) : (
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking.id} className="booking-item">
//               <div className="booking-details">
//                 <p>
//                   <strong>Booking ID:</strong> {booking.id}
//                 </p>
//                 <p>
//                   <strong>Check-in:</strong>{" "}
//                   {new Date(booking.dateFrom).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Check-out:</strong>{" "}
//                   {new Date(booking.dateTo).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Guests:</strong> {booking.guests}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookings } from "../../../api/getBookings";
import { useToken, useApiKey } from "../../../hooks/useStore";
import { Link } from "react-router-dom";
import "./BookedVenues.scss";

export const BookedVenues = () => {
  const token = useToken();
  const apiKey = useApiKey();
  const { name } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !apiKey) {
        return;
      }

      try {
        const bookings = await getBookings(name, token, apiKey); // Correct order of arguments
        setBookings(bookings);
        console.log(bookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, apiKey, name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="booked__venues">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="venue-item">
              <Link to={`/venues/${booking.id}`} className="managed__link">
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
            </li>
            /* <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p>
                  <strong>Guests:</strong> {booking.guests}
                </p> */
          ))}
        </ul>
      )}
    </div>
  );
};
