import "./HomeVenues.scss";
import { VenueCard, Button } from "../ui/";
import { useApi } from "../../hooks/useApi";

export const HomeVenuesSection = () => {
  const { data, isLoading, isError } = useApi(
    "https://v2.api.noroff.dev/holidaze/venues"
  );
  console.log(data);
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
      <section className="">
        <h4>Destinations</h4>
        <p>TOPO helps you with accommodation for all kinds of adventures.</p>
      </section>
    </>
  );
};
