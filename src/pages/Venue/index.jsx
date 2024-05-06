import "./Venue.scss";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Carousel } from "../../components/ui";
import { useState, useEffect } from "react";
import { StarRating } from "../../components/ui";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers";
// import { isBefore, isSameDay } from "date-fns";
import { DatePickerComponent } from "../../components/ui/DatePickerComponent";

export const Venue = () => {
  const params = useParams();
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useApi(
    `${BASEURL}/${params.id}?_bookings=true&_owner=true`
  );
  const [hideBtn, setHideBtn] = useState(false);

  useEffect(() => {
    if (data && data.data.media.length < 2) {
      setHideBtn(true);
    } else {
      setHideBtn(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: Failed to fetch data</div>;
  }

  const imagesToDisplay = data.data.media.map((item, index) => (
    <img key={index} src={item.url} alt={`Image ${index + 1}`} />
  ));

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
          <DatePickerComponent />
        </div>
      </div>
    </section>
  );
};
