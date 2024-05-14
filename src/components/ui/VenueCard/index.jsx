import "./VenueCard.scss";
import { StarRating } from "../StarRating";
import { Link } from "react-router-dom";

export const VenueCard = ({ data }) => {
  const imageUrl = data.media && data.media.length > 0 ? data.media[0].url : "";
  const imageAlt =
    data.media && data.media.length > 0 && data.media[0].alt
      ? data.media[0].alt
      : data.name;
  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "Outer, Space";
  };
  const capitalizeLocation = (country, city) => {
    const capitalizedCountry = country
      ? capitalizeFirstLetter(country)
      : "Outer";
    const capitalizedCity = city ? capitalizeFirstLetter(city) : "Space";

    return `${capitalizedCountry}, ${capitalizedCity}`;
  };

  return (
    <Link className="venue__card" to={`/venues/${data.id}`}>
      <img src={imageUrl} alt={imageAlt} />
      <div className="venue__card__info">
        <div>
          <div className="venue__title">
            <h3 className="card__h3">{capitalizeFirstLetter(data.name)}</h3>
            <StarRating rating={data.rating} />
          </div>
          <p className="card__location">
            {capitalizeLocation(data.location.country, data.location.city)}
          </p>
        </div>
        <p className="card__desc">{data.description}</p>
        <div>
          <span className="card__price">{data.price}$</span> per night
        </div>
      </div>
    </Link>
  );
};
