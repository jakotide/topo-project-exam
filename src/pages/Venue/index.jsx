import "./Venue.scss";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Carousel } from "../../components/ui";

export const Venue = () => {
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  let params = useParams();
  const { data, isError, isLoading } = useApi(`${BASEURL}/${params.id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: Failed to fetch data</div>;
  }

  const imagesToDisplay = Array.from(
    { length: data.data.media.length },
    (_, index) => {
      return data.data.media && data.data.media[index]
        ? data.data.media[index]
        : null;
    }
  );

  return (
    <>
      <section className="venue__container">
        <Carousel>
          {imagesToDisplay.map((item, index) => (
            <img key={index} src={item.url} alt={`Image ${index + 1}`} />
          ))}
        </Carousel>
        <h1>{data.data.name}</h1>
        <p>{data.data.description}</p>
      </section>
    </>
  );
};
