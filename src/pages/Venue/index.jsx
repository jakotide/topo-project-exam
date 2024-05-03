import "./Venue.scss";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { Carousel } from "../../components/ui";
import { useState, useEffect } from "react";

export const Venue = () => {
  const params = useParams();
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useApi(`${BASEURL}/${params.id}`);
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
      <h1>{data.data.name}</h1>
      <p>{data.data.description}</p>
    </section>
  );
};
