import "./HomeVenues.scss";

export const HomeVenuesSection = () => {
  return (
    <section className="home__venue__section">
      <h2 className="search__h2">Search</h2>
      <div className="search__container">
        <input type="search" name="search" id="id" aria-label="Search" />
        <button>Filter</button>
      </div>
    </section>
  );
};
