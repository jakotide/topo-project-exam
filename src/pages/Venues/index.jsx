import "./Venues.scss";
import {
  SearchFilterComponent,
  VenueCard,
  FilterComponent,
} from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import React, { useState } from "react";
import { cloudOne } from "../../assets/images";
import { Loader } from "../../components/ui/LoadingSpinner";

export const Venues = () => {
  const BASEURL = "https://v2.api.noroff.dev/holidaze/venues";
  const { data, isError, isLoading } = useApi(BASEURL, {});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [priceRange, setPriceRange] = useState([100, 12000]);
  const [wifiChecked, setWifiChecked] = useState(false);
  const [petsChecked, setPetsChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [breakfastChecked, setBreakfastChecked] = useState(false);

  const handleSearch = (newPriceRange, newSelectedRooms) => {
    setPriceRange(newPriceRange);
    setSelectedRooms(newSelectedRooms);
  };

  const handleWifiChange = (event) => {
    setWifiChecked(event.target.checked);
  };

  const handlePetsChange = (event) => {
    setPetsChecked(event.target.checked);
  };

  const handleParkingChange = (event) => {
    setParkingChecked(event.target.checked);
  };

  const handleBreakfastChange = (event) => {
    setBreakfastChecked(event.target.checked);
  };

  let content;

  if (isError) {
    content = <div>Error</div>;
  } else if (isLoading || data === null) {
    content = <Loader backgroundColor="#000000" />;
  } else {
    const exludedWords = [
      "test",
      "testing",
      "yo",
      "tittel",
      "lorem",
      "string",
      "Zzz",
      "zz",
      "z",
      "yes",
      "wadupss",
      "wqe",
      "wef",
      "wewer",
    ];

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
      })
      .filter((venue) => {
        const conditions = [
          { checked: wifiChecked, key: "wifi" },
          { checked: petsChecked, key: "pets" },
          { checked: parkingChecked, key: "parking" },
          { checked: breakfastChecked, key: "breakfast" },
        ];

        return conditions.every((condition) => {
          if (condition.checked) {
            return venue.meta[condition.key];
          }
          return true;
        });
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
        <img src={cloudOne} className="venue__cloud" alt="" />
        <img src={cloudOne} className="venue__cloud__two" alt="" />
        <div className="venues__grid__container">
          <div className="search__filter__container">
            <h2 className="search__h2">Search</h2>
            <div className="search__container">
              <SearchFilterComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <FilterComponent
                onSearch={handleSearch}
                wifiChecked={wifiChecked}
                onWifiChange={handleWifiChange}
                petsChecked={petsChecked}
                onPetsChange={handlePetsChange}
                parkingChecked={parkingChecked}
                onParkingChange={handleParkingChange}
                breakfastChecked={breakfastChecked}
                onBreakfastChange={handleBreakfastChange}
              />
            </div>
          </div>
          <div className="venues__grid">{content}</div>
        </div>
      </section>
    </>
  );
};
