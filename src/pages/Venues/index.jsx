import "./Venues.scss";
import { SearchFilterComponent, VenueCard } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import React, { useState } from "react";

export const Venues = () => {
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useApi(BASEURL);
  const [searchQuery, setSearchQuery] = useState("");

  let content;

  if (isError) {
    content = <div>Error</div>;
  } else if (isLoading || data === null) {
    content = <div>Loading</div>;
  } else {
    const exludedWords = ["test", "testing", "tittel", "lorem", "string"];
    // Filter venues based on search query
    const filteredVenues = data.data
      .filter((item) =>
        exludedWords.every(
          (word) =>
            (!item.name || !item.name.toLowerCase().includes(word)) &&
            (!item.description ||
              !item.description.toLowerCase().includes(word))
        )
      )
      .filter(
        (venue) =>
          // Filter by search query
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (venue.description &&
            venue.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    content = filteredVenues.map((venue) => (
      <VenueCard key={venue.id} data={venue} />
    ));
  }

  return (
    <>
      <section className="venues__section">
        <h1 className="venues__h1">Venues</h1>
        <div className="venues__grid__container">
          <SearchFilterComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="venues__grid">{content}</div>
        </div>
      </section>
    </>
  );
};
