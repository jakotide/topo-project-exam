import "./VenueCard.scss";
import { StarRating } from "../StarRating";

export const VenueCard = ({ data }) => {
  const imageUrl = data.media && data.media.length > 0 ? data.media[0].url : "";
  return (
    <div className="venue__card">
      <img src={imageUrl} alt="" />
      <div className="venue__card__info">
        <div className="venue__title">
          <h3 className="card__h3">{data.name}</h3>
          <StarRating rating={data.rating} />
        </div>
        <p>{data.description}</p>
        <div>
          <span className="card__price">{data.price}$</span> per night
        </div>
      </div>
    </div>
  );
};
