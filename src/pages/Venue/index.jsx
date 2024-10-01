import "./Venue.scss";
import { useSingleVenue } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Carousel, VenueBookingBox, StarRating } from "../../components/ui";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SuccessModal } from "../../components/ui/SuccessModal";
import { Loader } from "../../components/ui/LoadingSpinner";

export const Venue = () => {
  const params = useParams();
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useSingleVenue(
    `${BASEURL}/${params.id}?_bookings=true&_owner=true`
  );

  const [hideBtn, setHideBtn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    if (data && data.media && data.media.length < 2) {
      setHideBtn(true);
    } else {
      setHideBtn(false);
    }
  }, [data]);

  if (isLoading) {
    return <Loader backgroundColor="#000000" />;
  }

  if (isError) {
    return <div>Error: Failed to fetch data</div>;
  }

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const imagesToDisplay =
    data.media && Array.isArray(data.media)
      ? data.media.map((item, index) => (
          <img
            key={index}
            src={item.url}
            alt={item.alt || `Image ${index + 1}`}
          />
        ))
      : [];

  return (
    <section className="venue__container">
      <Carousel hideBtn={hideBtn}>{imagesToDisplay}</Carousel>
      <div className="padding__container">
        <div className="venue__section__container">
          <div className="venue__info">
            <div>
              <div className="info__header">
                <h1 className="venue__page__h1">{data.name}</h1>
                <div className="venue__location">
                  {data.location.city === "" ? "Outer" : data.location.city},{" "}
                  {data.location.country === null || ""
                    ? "Space"
                    : data.location.country}
                </div>
              </div>

              <StarRating rating={data.rating} />
              <div className="hosted__container">
                <img
                  className="venue__owner__avatar"
                  src={data.owner.avatar.url}
                  alt="Owner Avatar"
                />
                <div>Hosted by {data.owner.name}</div>
              </div>
            </div>
            <p className="venue__description">
              {data.description
                ? data.description
                : "No description available."}
            </p>
            <h2>Includes</h2>
            <div className="includes__grid">
              {data.meta.breakfast && <div>Breakfast</div>}
              {data.meta.wifi && <div>Wifi</div>}
              {data.meta.pets && <div>Pets</div>}
              {data.meta.parking && <div>Parking</div>}
              {!data.meta.breakfast &&
                !data.meta.wifi &&
                !data.meta.pets &&
                !data.meta.parking && <p>No amenities included.</p>}
            </div>
            <h3>Info</h3>
            <div className="venue__info__container">
              <div>Max guests: {data.maxGuests}</div>
              <div>Booked {data._count.bookings} times</div>
            </div>
          </div>
          <VenueBookingBox
            venueId={params.id}
            onBookingSuccess={handleBookingSuccess}
          />
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessModal>
            Success! Go to profile to see your booking.
          </SuccessModal>
        )}
      </AnimatePresence>
    </section>
  );
};
