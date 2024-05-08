import "./SearchFilterComponent.scss";

export const SearchFilterComponent = ({ searchQuery, setSearchQuery }) => {
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <h2 className="search__h2">Search</h2>
      <form className="search__container">
        <input
          type="search"
          name="search"
          id="id"
          aria-label="Search"
          onChange={handleSearchQuery}
          value={searchQuery}
        />
        <button>Filter</button>
      </form>
    </>
  );
};
