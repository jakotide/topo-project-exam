import "./HomeVenues.scss";
import { VenueCard } from "../ui/VenueCard";
import { useApi } from "../../hooks/useApi";

export const HomeVenuesSection = () => {
  const { data, isLoading, isError } = useApi(
    "https://v2.api.noroff.dev/holidaze/venues"
  );

  let content;
  if (isError) {
    content = <div>Error</div>;
  } else if (isLoading) {
    content = <div>Loading</div>;
  } else if (data === null) {
    content = <div>Waddup</div>;
  } else {
    const firstSixVenues = data.data.slice(0, 6);
    content = firstSixVenues.map((item) => (
      <VenueCard data={item} key={item.id} />
    ));
  }

  return (
    <section className="home__venue__section">
      <h2 className="search__h2">Search</h2>
      <div className="search__container">
        <input type="search" name="search" id="id" aria-label="Search" />
        <button>Filter</button>
      </div>
      <div className="home__venue__grid">{content}</div>
    </section>
  );
};
