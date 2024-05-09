import "./SearchFilterComponent.scss";
import { FilterComponent } from "../FilterComponent";
export const SearchFilterComponent = ({ searchQuery, setSearchQuery }) => {
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <h2 className="search__h2">Search</h2>
      <div className="search__container">
        <input
          type="search"
          name="search"
          id="id"
          aria-label="Search"
          onChange={handleSearchQuery}
          value={searchQuery}
        />
        <FilterComponent></FilterComponent>
      </div>
    </>
  );
};
