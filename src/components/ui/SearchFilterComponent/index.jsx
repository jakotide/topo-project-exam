import "./SearchFilterComponent.scss";

export const SearchFilterComponent = () => {
  return (
    <>
      <h2 className="search__h2">Search</h2>
      <div className="search__container">
        <input type="search" name="search" id="id" aria-label="Search" />
        <button>Filter</button>
      </div>
    </>
  );
};
