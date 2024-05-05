import "./Venue.scss";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Carousel } from "../../components/ui";
import { useState, useEffect } from "react";
import { StarRating } from "../../components/ui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { isBefore, isSameDay } from "date-fns";

export const Venue = () => {
  const params = useParams();
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useApi(
    `${BASEURL}/${params.id}?_bookings=true&_owner=true`
  );
  const [hideBtn, setHideBtn] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  useEffect(() => {
    if (data && data.data.media.length < 2) {
      setHideBtn(true);
    } else {
      setHideBtn(false);
    }

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: Failed to fetch data</div>;
  }

  const imagesToDisplay = data.data.media.map((item, index) => (
    <img key={index} src={item.url} alt={`Image ${index + 1}`} />
  ));

  const areDatesEqual = (date1, date2) => {
    return (
      date1 &&
      date2 &&
      date1.$y === date2.$y &&
      date1.$M === date2.$M &&
      date1.$D === date2.$D
    );
  };

  return (
    <section className="venue__container">
      <Carousel hideBtn={hideBtn}>{imagesToDisplay}</Carousel>
      <div>
        <div className="venue__info">
          <div>
            <h1>{data.data.name}</h1>
            <div className="">
              {data.data.location.city}, {data.data.location.country}
            </div>
            <StarRating></StarRating>
            <div>
              <img
                className="venue__owner__avatar"
                src={data.data.owner.avatar.url}
                alt=""
              />
              <div>Hosted by {data.data.owner.name}</div>
            </div>
          </div>
          <p>{data.data.description}</p>
          <h2>Includes</h2>
          <div>
            <div>{data.data.meta.breakfast ? "Breakfast" : ""}</div>
            <div>{data.data.meta.wifi ? "Wifi" : ""}</div>
            <div>{data.data.meta.pets ? "Pets" : ""}</div>
            <div>{data.data.meta.parking ? "Parking" : ""}</div>
          </div>
          <h3>Info</h3>
          <div>Max guests: {data.data.maxGuests}</div>
          <div>Booked {data.data.bookings.length} times</div>
        </div>
        <div className="venue__booking__box">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
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
      </div>
    </section>
  );
};
