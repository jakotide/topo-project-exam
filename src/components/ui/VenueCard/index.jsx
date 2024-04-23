import "./VenueCard.scss";

export const VenueCard = ({ data }) => {
  const imageUrl = data.media && data.media.length > 0 ? data.media[0].url : "";
  return (
    <div className="venue__card">
      <img src={imageUrl} alt="" />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
    </div>
  );
};
