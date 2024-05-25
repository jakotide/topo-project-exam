// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { getBookings } from "../../../api/getBookings";
// import { deleteBooking } from "../../../api/deleteBooking";
// import { useToken, useApiKey } from "../../../hooks/useStore";
// import { Link } from "react-router-dom";
// import "./BookedVenues.scss";

// export const BookedVenues = () => {
//   const dialogRef = useRef(null);
//   const token = useToken();
//   const apiKey = useApiKey();
//   const { name } = useParams();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const dialogElement = dialogRef.current;
//     if (dialogElement) {
//       dialogElement.addEventListener("click", handleDialogClick);
//       return () => {
//         dialogElement.removeEventListener("click", handleDialogClick);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!token || !apiKey) {
//         return;
//       }

//       try {
//         const bookings = await getBookings(name, token, apiKey);
//         setBookings(bookings);
//         console.log(bookings);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching bookings:", err.message);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [token, apiKey, name]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const handleDeleteVenue = async (venueId) => {
//     try {
//       await deleteBooking(venueId, token, apiKey);
//       console.log("Success!");
//     } catch (error) {
//       console.error("Error deleting venue:", error);
//     }
//   };

//   const openDialog = () => {
//     if (!dialogRef.current) return;
//     dialogRef.current.showModal();
//     document.body.classList.add("modal-open");
//   };

//   const closeDialog = () => {
//     if (!dialogRef.current) return;
//     dialogRef.current.close();
//     document.body.classList.remove("modal-open");
//   };

//   const handleDialogClick = (e) => {
//     const dialogDimensions = dialogRef.current.getBoundingClientRect();
//     if (
//       e.clientX < dialogDimensions.left ||
//       e.clientX > dialogDimensions.right ||
//       e.clientY < dialogDimensions.top ||
//       e.clientY > dialogDimensions.bottom
//     ) {
//       closeDialog();
//     }
//   };

//   return (
//     <div className="booked__venues">
//       <h2>Your Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>You have no bookings.</p>
//       ) : (
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking.id} className="venue-item">
//               <Link to={`/venues/${booking.id}`} className="managed__link">
//                 <div className="image__name__container">
//                   <img
//                     src={booking.venue.media[0]?.url}
//                     alt={booking.venue.media[0]?.alt || booking.name}
//                     className="venue-avatar"
//                   />
//                   <span className="managed__venue__name">
//                     {booking.venue.name}
//                   </span>
//                 </div>
//               </Link>
//               <p>{new Date(booking.dateFrom).toLocaleDateString()}</p>
//               <p>{new Date(booking.dateTo).toLocaleDateString()}</p>
//               <button onClick={openDialog} className="delete__venue__btn">
//                 Cancel
//               </button>
//               <dialog ref={dialogRef} className="dialog__element">
//                 <p>Cancel this booking?</p>
//                 <div>
//                   <button onClick={() => handleDeleteVenue(booking.id)}>
//                     Yes
//                   </button>
//                   <button onClick={closeDialog}>Cancel</button>
//                 </div>
//               </dialog>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
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
