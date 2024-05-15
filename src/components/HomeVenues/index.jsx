import "./HomeVenues.scss";
import {
  VenueCard,
  Button,
  SearchFilterComponent,
  FilterComponent,
} from "../ui/";
import { useApi } from "../../hooks/useApi";
import { destinationCards, destinationInfo } from "./data";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { slideUp, MoreButton, BrowseButton } from "./anim";
import { BoxReveal } from "../../effects/BoxReveal";

export const HomeVenuesSection = ({ options, children }) => {
  const { data, isLoading, isError } = useApi(
    "https://v2.api.noroff.dev/holidaze/venues"
  );
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

    const firstSixVenues = filteredVenues.slice(0, 6);
    if (firstSixVenues.length === 0) {
      content = <div className="no__match__message">No matching results!</div>;
    } else {
      content = firstSixVenues.map((venue) => (
        <VenueCard key={venue.id} data={venue} />
      ));
    }
  }

  // Footer Reveal
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end 250px"],
  });

  const height = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Destination info text reveal
  const destInfoAnimation = useRef(null);

  const isInView = useInView(destInfoAnimation, { once: true });

  return (
    <div ref={container}>
      <section className="home__venue__section">
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
        <div className="home__venue__grid">{content}</div>
        <Button
          className="more__venues__button"
          style={{ width: "14rem", gap: "1.8rem" }}
          variants={MoreButton}
        >
          More Venues
        </Button>
      </section>
      <section className="destination__section">
        <h4 className="destination__header">Destinations</h4>

        <p className="destination__info" ref={destInfoAnimation}>
          {destinationInfo.split(" ").map((word, index) => {
            return (
              <span key={index} className="mask">
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "active" : "closed"}
                  key={index}
                  className="word"
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>

        <div className="destination__card__grid">
          {destinationCards.map((destination, index) => (
            <div key={index} className="destination__card">
              <img
                src={destination.image}
                alt={destination.alt}
                className="destination__card__img"
              />
              {/* <div className="destination__tag">{destination.tag}</div> */}
              <h5>{destination.title}</h5>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
        <div className="get__inspired">
          <p>Get Inspired</p>
          <Button
            className="browse__button"
            style={{ width: "16rem", gap: "2.1rem" }}
            variants={BrowseButton}
          >
            Browse Venues
          </Button>
        </div>
      </section>
      <section className="color__card__section">
        <BoxReveal>
          <div className="color__card">
            <p>Got a venue to list out?</p>
            <div>
              <p>Become a venue manager</p>
            </div>
          </div>
        </BoxReveal>
        <BoxReveal>
          <div className="color__card green">
            <p>Got any questions?</p>
            <div>
              <p>Contact our customer support</p>
            </div>
          </div>
        </BoxReveal>
      </section>
      <motion.div className="circleContainer" style={{ height }}>
        <div className="circle"></div>
      </motion.div>
    </div>
  );
};
