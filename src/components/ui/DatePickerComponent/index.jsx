import { useApi } from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
import "./DatePickerComponent.scss";
import { format } from "date-fns";

export const DatePickerComponent = () => {
  const params = useParams();
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data } = useApi(`${BASEURL}/${params.id}?_bookings=true&_owner=true`);
  const [bookedDates, setBookedDates] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

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

  const calculateTotalSum = () => {
    if (dateFrom && dateTo && data && data.data && data.data.price) {
      const pricePerNight = data.data.price;
      const numberOfNights = Math.ceil(
        (dateTo - dateFrom) / (1000 * 60 * 60 * 24)
      ); // Calculate number of nights
      return pricePerNight * numberOfNights;
    }
    return null; // Return null if any required data is missing
  };

  return (
    <form className="venue__booking__box">
      {data && data.data && (
        <div className="venue__price">
          <span>{data.data.price}$</span> per night{" "}
        </div>
      )}
      <div className="datepicker__container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <div>
            {dateFrom && areDatesEqual(dateFrom, dateTo) && (
              <div className="required-message">Minimum 1 night stay</div>
            )}
          </div>
        </LocalizationProvider>
      </div>
      <input
        type="number"
        aria-label="Number of guests input"
        className="guests__input"
        placeholder="Guests"
        min="1"
      />
      <button type="submit" className="book__button">
        Book
      </button>
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
