// import "./Venues.scss";
// import {
//   SearchFilterComponent,
//   VenueCard,
//   FilterComponent,
// } from "../../components/ui";
// import { useApi } from "../../hooks/useApi";
// import React, { useState } from "react";

// export const Venues = () => {
//   const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
//   const { data, isError, isLoading } = useApi(BASEURL);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRooms, setSelectedRooms] = useState(null);
//   const [priceRange, setPriceRange] = useState([100, 12000]);

//   const handleSearch = () => {
//     setSelectedRooms(selectedRooms);
//     setPriceRange(priceRange);
//   };

//   let content;

//   if (isError) {
//     content = <div>Error</div>;
//   } else if (isLoading || data === null) {
//     content = <div>Loading</div>;
//   } else {
//     const exludedWords = ["test", "testing", "tittel", "lorem", "string"];

//     const filteredVenues = data.data
//       .filter((item) =>
//         exludedWords.every(
//           (word) =>
//             (!item.name || !item.name.toLowerCase().includes(word)) &&
//             (!item.description ||
//               !item.description.toLowerCase().includes(word))
//         )
//       )
//       .filter(
//         (venue) =>
//           venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (venue.description &&
//             venue.description.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//     // .filter(
//     //   (venue) => venue.price >= priceRange[0] && venue.price <= priceRange[1]
//     // );
//     if (filteredVenues.length === 0) {
//       content = <div className="no__match__message">No matching results!</div>;
//     } else {
//       content = filteredVenues.map((venue) => (
//         <VenueCard key={venue.id} data={venue} />
//       ));
//     }
//   }

//   return (
//     <>
//       <section className="venues__section">
//         <h1 className="venues__h1">Venues</h1>
//         <div className="venues__grid__container">
//           <div className="search__filter__container">
//             <h2 className="search__h2">Search</h2>
//             <div className="search__container">
//               <SearchFilterComponent
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//               />
//               <FilterComponent onSearch={handleSearch}></FilterComponent>
//             </div>
//           </div>

//           <div className="venues__grid">{content}</div>
//         </div>
//       </section>
//     </>
//   );
// };

import "./Venues.scss";
import {
  SearchFilterComponent,
  VenueCard,
  FilterComponent,
} from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import React, { useState } from "react";

export const Venues = () => {
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useApi(BASEURL);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [priceRange, setPriceRange] = useState([100, 12000]);

  const handleSearch = (newPriceRange, newSelectedRooms) => {
    setPriceRange(newPriceRange);
    setSelectedRooms(newSelectedRooms);
  };

  let content;

  if (isError) {
    content = <div>Error</div>;
  } else if (isLoading || data === null) {
    content = <div>Loading</div>;
  } else {
    const exludedWords = ["test", "testing", "tittel", "lorem", "string"];

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
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (venue.description &&
            venue.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .filter(
        (venue) => venue.price >= priceRange[0] && venue.price <= priceRange[1]
      )
      .filter((venue) => {
        if (selectedRooms === null) {
          return true;
        } else if (selectedRooms === "8+") {
          return venue.maxGuests >= 8;
        } else {
          return venue.maxGuests === selectedRooms;
        }
      });

    if (filteredVenues.length === 0) {
      content = <div className="no__match__message">No matching results!</div>;
    } else {
      content = filteredVenues.map((venue) => (
        <VenueCard key={venue.id} data={venue} />
      ));
    }
  }

  return (
    <>
      <section className="venues__section">
        <h1 className="venues__h1">Venues</h1>
        <div className="venues__grid__container">
          <div className="search__filter__container">
            <h2 className="search__h2">Search</h2>
            <div className="search__container">
              <SearchFilterComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <FilterComponent onSearch={handleSearch} />
            </div>
          </div>

          <div className="venues__grid">{content}</div>
        </div>
      </section>
    </>
  );
};
