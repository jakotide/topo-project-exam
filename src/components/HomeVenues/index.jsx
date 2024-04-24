import "./HomeVenues.scss";
import { VenueCard, Button, ArrowRightSvg } from "../ui/";
import { useApi } from "../../hooks/useApi";
import { destinationCards, destinationInfo } from "./data";

export const HomeVenuesSection = ({ options }) => {
  const { data, isLoading, isError } = useApi(
    "https://v2.api.noroff.dev/holidaze/venues"
  );

  let content;
  if (isError) {
    content = <div>Error</div>;
  } else if (isLoading || data === null) {
    content = <div>Loading</div>;
  } else {
    const filteredOutWords = [
      "test",
      "testing",
      "example",
      "string",
      "lorem",
      "tittel",
    ];
    const filteredVenues = data.data.filter((item) =>
      filteredOutWords.every(
        (word) =>
          (!item.name || !item.name.toLowerCase().includes(word)) &&
          (!item.description || !item.description.toLowerCase().includes(word))
      )
    );

    const firstSixVenues = filteredVenues.slice(1, 7);
    content = firstSixVenues.map((item) => (
      <VenueCard data={item} key={item.id} />
    ));
  }

  const customVariantMoreButton = {
    normal: {
      x: "-28px",
    },
    active: {
      x: "26px",
    },
  };

  const variantsBrowseButton = {
    normal: {
      x: "-32px",
    },
    active: {
      x: "29px",
    },
  };

  return (
    <>
      <section className="home__venue__section">
        <h2 className="search__h2">Search</h2>
        <div className="search__container">
          <input type="search" name="search" id="id" aria-label="Search" />
          <button>Filter</button>
        </div>
        <div className="home__venue__grid">{content}</div>
        <Button
          className="more__venues__button"
          style={{ width: "14rem", gap: "1.8rem" }}
          variants={customVariantMoreButton}
        >
          More Venues
        </Button>
      </section>
      <section className="destination__section">
        <h4 className="destination__header">Destinations</h4>
        <p className="destination__info">{destinationInfo}</p>
        {/* <div className="destination__card__grid">
          {destinationCards.map((destination, index) => (
            <div key={index} className="destination__card">
              <img
                src={destination.image}
                alt={destination.alt}
                className="destination__card__img"
              />
              <div className="destination__tag">{destination.tag}</div>
              <h5>{destination.title}</h5>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
        <div className="get__inspired">
          <p>Get Inspired</p>
          <Button
            className="browse__button"
            style={{ width: "16rem", gap: "2.1rem" }}
            variants={variantsBrowseButton}
          >
            Browse Venues
          </Button>
        </div> */}
      </section>
      {/* <section className="color__card__section">
        <div className="color__card">
          <p>Got a venue to list out?</p>
          <div>
            <p>Become a venue manager</p>
            <ArrowRightSvg
              options={{
                width: "24px",
                height: "24px",
                fill: "#000000",
              }}
            />
          </div>
        </div>
        <div className="color__card green">
          <p>Got any questions?</p>
          <div>
            <p>Contact our customer support</p>
            <ArrowRightSvg
              options={{
                width: "24px",
                height: "24px",
                fill: "#000000",
              }}
            />
          </div>
        </div>
      </section> */}
    </>
  );
};
