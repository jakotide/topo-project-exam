import { useApi } from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { postBooking } from "../../../api/postBooking";
import { useToken, useApiKey } from "../../../hooks/useStore";
import { Loader } from "../LoadingSpinner";
import { Link } from "react-router-dom";
import "./VenueBookingBox.scss";

export const VenueBookingBox = () => {
  const params = useParams();
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data } = useApi(`${BASEURL}/${params.id}?_bookings=true&_owner=true`);
  const [bookedDates, setBookedDates] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);
  const [exceededMaxGuests, setExceededMaxGuests] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const token = useToken();
  const apiKey = useApiKey();

  useEffect(() => {
    if (data && data.data.bookings) {
      const bookedDatesArray = data.data.bookings;
      setBookedDates(bookedDatesArray);
    }
  }, [data]);

  const isDateBooked = (date) => {
    const isBooked = bookedDates.some((booking) => {
      const bookingDateFrom = new Date(booking.dateFrom);
      const bookingDateTo = new Date(booking.dateTo);
      return date >= bookingDateFrom && date <= bookingDateTo;
    });

    return isBooked;
  };

  const areDatesEqual = (date1, date2) => {
    return (
      date1 &&
      date2 &&
      date1.$y === date2.$y &&
      date1.$M === date2.$M &&
      date1.$D === date2.$D
    );
  };

  const numberOfNights = Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24));

  const calculateTotalSum = () => {
    if (dateFrom && dateTo && data && data.data && data.data.price) {
      const pricePerNight = data.data.price;
      return pricePerNight * numberOfNights;
    }
    return null;
  };

  const handleMaxGuests = (event) => {
    const value = parseInt(event.target.value);

    if (value === data.data.maxGuests) {
      setExceededMaxGuests(true);
    } else {
      setExceededMaxGuests(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!dateFrom || !dateTo) {
      console.log("Form validation failed - Dates not selected");
      setBookingError("Please select check-in and check-out dates.");
      return;
    }

    if (guests < 1) {
      console.log("Form validation failed - No. of guests is less than 1");
      setBookingError("Please enter at least 1 guest.");
      return;
    }

    if (dateFrom && dateTo && dateFrom >= dateTo) {
      console.log(
        "Form validation failed - Check-out date before or same as check-in date"
      );
      setBookingError("Check-out date must be after check-in date.");
      return;
    }

    if (dateFrom && areDatesEqual(dateFrom, dateTo)) {
      console.log("Form validation failed - Minimum 1 night stay");
      setBookingError("Minimum stay is 1 night.");
      return;
    }

    if (guests > data.data.maxGuests) {
      console.log("Form validation failed - Exceeded maximum guests");
      setExceededMaxGuests(true);
      setBookingError(
        `Maximum number of guests allowed is ${data.data.maxGuests}.`
      );
      return;
    }

    setLoading(true);
    setBookingError(null);

    try {
      const bookingData = {
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
        guests: guests,
        venueId: params.id,
      };

      await postBooking(bookingData, token, apiKey);

      setDateFrom(null);
      setDateTo(null);
      setGuests(1);
      setExceededMaxGuests(false);
      setBookingError(null);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setBookingError(error.message);
    }
  };

  return (
    <form className="venue__booking__box" onSubmit={handleBookingSubmit}>
      {data && data.data && (
        <div className="venue__price">
          <span>{data.data.price}$</span> per night{" "}
        </div>
      )}
      <div className="datepicker__container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="checkin__container">
            <DatePicker
              slotProps={{
                layout: {
                  sx: {
                    color: "#171717",

                    "& .MuiButtonBase-root": {
                      color: "black",
                      fontFamily: "GeneralSans-Regular",
                    },
                    "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected:hover":
                      {
                        backgroundColor: "#ff7c7c",
                      },
                    "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "#ff7c7c",
                    },
                    "& .MuiDatePickerToolbar-title": {
                      color: "black",
                      fontFamily: "GeneralSans-Regular",
                    },
                    "& .MuiPickersCalendarHeader-root": {
                      fontFamily: "GeneralSans-Regular",
                    },
                    "& .MuiPickersYear-yearButton.Mui-selected": {
                      backgroundColor: "#ff7c7c",
                    },
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      font: "GeneralSans-Regular",
                    },

                    "& .MuiPickersLayout-root.MuiPickersYear-yearButton.Mui-selected":
                      {
                        backgroundColor: "#ff7c7c",
                      },
                    "[for=':r3:']": {
                      color: "red",
                      outline: "2px solid red",
                    },
                  },
                },
              }}
              className="dateFrom"
              label="Check In"
              value={dateFrom}
              onChange={(newDate) => {
                setDateFrom(newDate);
              }}
              shouldDisableDate={(date) =>
                isDateBooked(date) || date < new Date()
              }
            />
            <DatePicker
              slotProps={{
                layout: {
                  sx: {
                    color: "#171717",

                    "& .MuiButtonBase-root": {
                      color: "black",
                      fontFamily: "GeneralSans-Regular",
                    },
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      font: "GeneralSans-Regular",
                    },
                    "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected:hover":
                      {
                        backgroundColor: "#ff7c7c",
                      },
                    "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "#ff7c7c",
                    },
                    "& .MuiDatePickerToolbar-title": {
                      color: "black",
                      fontFamily: "GeneralSans-Regular",
                    },
                    "& .MuiPickersCalendarHeader-root": {
                      fontFamily: "GeneralSans-Regular",
                    },
                    "& .MuiPickersYear-yearButton.Mui-selected": {
                      backgroundColor: "#ff7c7c",
                    },

                    "& .MuiPickersLayout-root.MuiPickersYear-yearButton.Mui-selected":
                      {
                        backgroundColor: "#ff7c7c",
                      },
                  },
                },
              }}
              className="dateTo"
              label="Check Out"
              value={dateTo}
              onChange={(newDate) => setDateTo(newDate)}
              shouldDisableDate={(date) =>
                isDateBooked(date) ||
                (dateFrom && date < dateFrom) ||
                (dateFrom &&
                  bookedDates.some(
                    (booking) =>
                      new Date(booking.dateFrom) >= dateFrom &&
                      new Date(booking.dateFrom) <= date
                  ))
              }
            />
          </div>

          <div>
            {dateFrom && areDatesEqual(dateFrom, dateTo) && (
              <div className="required-message">Minimum 1 night stay</div>
            )}
          </div>
        </LocalizationProvider>
      </div>
      {data && (
        <input
          type="number"
          aria-label="Number of guests input"
          className="guests__input"
          placeholder="Guests"
          min="1"
          max={data.data.maxGuests}
          onChange={handleMaxGuests}
        />
      )}
      {exceededMaxGuests && (
        <div className="required-message">
          Maximun number of guests allowed is {data.data.maxGuests}
        </div>
      )}
      {bookingError && <div className="required-message">{bookingError}</div>}
      {token ? (
        <button
          type="submit"
          className="book__button"
          disabled={loading || success}
        >
          {loading ? <Loader /> : success ? "Success!" : "Book"}
        </button>
      ) : (
        <Link to="/login">
          <button className="book__button">Login to book</button>
        </Link>
      )}

      {numberOfNights > 0 && data && data.data && calculateTotalSum() && (
        <div className="venue__calculated__total">
          <span className="total__x">
            {data.data.price}$<span>X</span>
            {numberOfNights}
          </span>
          <span>{calculateTotalSum()}$</span>
        </div>
      )}
      {calculateTotalSum() ? (
        <div className="venue__total">
          <span>Total sum:</span>
          <span>{calculateTotalSum()}$</span>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};
