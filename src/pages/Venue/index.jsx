import "./Venue.scss";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Carousel } from "../../components/ui";
import { useState, useEffect, useRef } from "react";
import { StarRating } from "../../components/ui";
import { DatePickerComponent } from "../../components/ui/DatePickerComponent";
import { motion, useScroll, useTransform } from "framer-motion";

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

  const venueContainer = useRef(null);

  const { scrollYProgress } = useScroll({
    target: venueContainer,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

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
    <div ref={venueContainer}>
      <section className="venue__container">
        <Carousel hideBtn={hideBtn}>{imagesToDisplay}</Carousel>
        <div className="venue__section__container">
          <div className="venue__info">
            <div>
              <div className="info__header">
                <h1>{data.data.name}</h1>
                <div className="">
                  {data.data.location.city}, {data.data.location.country}
                </div>
              </div>

              <StarRating rating={data.data.rating}></StarRating>
              <div className="hosted__container">
                <img
                  className="venue__owner__avatar"
                  src={data.data.owner.avatar.url}
                  alt=""
                />
                <div>Hosted by {data.data.owner.name}</div>
              </div>
            </div>
            <p className="venue__description">
              {data.data.description
                ? data.data.description
                : "No description available."}
            </p>
            <h2>Includes</h2>
            <div className="includes__grid">
              {data.data.meta.breakfast ? (
                <div>{data.data.meta.breakfast ? "Breakfast" : ""}</div>
              ) : null}
              {data.data.meta.wifi ? (
                <div>{data.data.meta.wifi ? "Wifi" : ""}</div>
              ) : null}
              {data.data.meta.pets ? (
                <div>{data.data.meta.pets ? "Pets" : ""}</div>
              ) : null}
              {data.data.meta.parking ? (
                <div>{data.data.meta.parking ? "Parking" : ""}</div>
              ) : null}
              {!data.data.meta.breakfast &&
                !data.data.meta.wifi &&
                !data.data.meta.pets &&
                !data.data.meta.parking && <p>No amenities included.</p>}
            </div>
            <h3>Info</h3>
            <div className="venue__info__container">
              <div>Max guests: {data.data.maxGuests}</div>
              <div>Booked {data.data.bookings.length} times</div>
            </div>
          </div>
          <DatePickerComponent />
        </div>
      </section>
      <motion.div className="circleContainer" style={{ height }}>
        <div className="circle"></div>
      </motion.div>
    </div>
  );
};
