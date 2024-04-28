import "./Venue.scss";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";

export const Venue = () => {
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  let params = useParams();
  const { data, isError, isLoading } = useApi(`${BASEURL}/${params.id}`);
  console.log("Data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: Failed to fetch data</div>;
  }

  const hasMedia =
    data.data.media &&
    Array.isArray(data.data.media) &&
    data.data.media.length > 0;

  return (
    <>
      <section className="venue__container">
        <h1>{data.data.name}</h1>
        <p>{data.data.description}</p>
        <div className="images-container">
          {hasMedia &&
            data.data.media.map((item, index) => (
              <img key={index} src={item.url} alt={`Image ${index + 1}`} />
            ))}
        </div>
      </section>
    </>
  );
};
