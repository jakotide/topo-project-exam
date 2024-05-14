import "./SearchFilterComponent.scss";

export const SearchFilterComponent = ({ searchQuery, setSearchQuery }) => {
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <input
        type="search"
        name="search"
        id="id"
        aria-label="Search"
        onChange={handleSearchQuery}
        value={searchQuery}
      />
    </>
  );
};
