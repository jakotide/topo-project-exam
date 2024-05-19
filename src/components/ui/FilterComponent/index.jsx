import "./FilterComponent.scss";
import FilterIcon from "../../../assets/icons/filter.png";
import CloseIcon from "../../../assets/icons/x.png";
import { useRef, useState, useEffect } from "react";
import Slider from "react-slider";

export const FilterComponent = ({
  onSearch,
  wifiChecked,
  onWifiChange,
  petsChecked,
  onPetsChange,
  parkingChecked,
  onParkingChange,
  breakfastChecked,
  onBreakfastChange,
}) => {
  const minValue = 100;
  const maxValue = 12000;
  const dialogRef = useRef(null);
  const [values, setValues] = useState([minValue, maxValue]);
  const [selectedRooms, setSelectedRooms] = useState(null);

  const openDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
    document.body.classList.add("modal-open");
  };

  const closeDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    document.body.classList.remove("modal-open");
  };

  const handleRoomButtonClick = (rooms) => {
    setSelectedRooms(rooms);
  };

  const handleSearchClick = () => {
    onSearch(values, selectedRooms);
    closeDialog();
  };

  const handleDialogClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeDialog();
    }
  };

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.addEventListener("click", handleDialogClick);
      return () => {
        dialogElement.removeEventListener("click", handleDialogClick);
      };
    }
  }, []);

  return (
    <>
      <button onClick={openDialog} className="filter__btn">
        <img src={FilterIcon} alt="Filter icon" />
      </button>
      <dialog
        ref={dialogRef}
        aria-modal="true"
        className="filter__modal__container"
      >
        <div className="filter__modal">
          <div className="filter__header">
            <div>Filter</div>
            <button onClick={closeDialog} className="modal__close__button">
              <img src={CloseIcon} alt="Close icon" />
            </button>
          </div>
          <div className="filter__modal__content">
            <div className="filter__modal__content__box">
              <div className="price__slider__box">
                <div className="modal__header">Price Range</div>
                <div>Select the minimum and maximum price</div>
                <Slider
                  value={values}
                  min={minValue}
                  max={maxValue}
                  onChange={setValues}
                  className="slider"
                  aria-label="Price range slider"
                  minDistance={500}
                />
                <div className="price__box">
                  <div>{values[0]} $</div>
                  <div className="line">-</div>
                  <div>{values[1]} $</div>
                </div>
              </div>
              <div className="rooms__box">
                <div className="modal__header">Number of rooms</div>
                <div className="rooms__btn__container">
                  <button
                    className={`rooms__btn ${
                      selectedRooms === null ? "active" : ""
                    }`}
                    aria-pressed={selectedRooms === null ? "true" : "false"}
                    onClick={() => handleRoomButtonClick(null)}
                  >
                    All
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7].map((numRooms) => (
                    <button
                      key={numRooms}
                      className={`rooms__btn ${
                        selectedRooms === numRooms ? "active" : ""
                      }`}
                      aria-pressed={
                        selectedRooms === numRooms ? "true" : "false"
                      }
                      onClick={() => handleRoomButtonClick(numRooms)}
                    >
                      {numRooms}
                    </button>
                  ))}
                  <button
                    className={`rooms__btn ${
                      selectedRooms === "8+" ? "active" : ""
                    }`}
                    aria-pressed={selectedRooms === "8+" ? "true" : "false"}
                    onClick={() => handleRoomButtonClick("8+")}
                  >
                    8+
                  </button>
                </div>
              </div>
              <div className="amenities__container">
                <div className="modal__header">Amenities</div>
                <div className="checkbox__grid">
                  <div className="checkbox__container">
                    <input
                      type="checkbox"
                      name="wifi"
                      id="wifi"
                      className="amenities__checkbox"
                      checked={wifiChecked}
                      onChange={onWifiChange}
                    />
                    <label htmlFor="wifi">Wifi</label>
                  </div>
                  <div className="checkbox__container">
                    <input
                      type="checkbox"
                      name="pets"
                      id="pets"
                      className="amenities__checkbox"
                      checked={petsChecked}
                      onChange={onPetsChange}
                    />
                    <label htmlFor="pets">Pets</label>
                  </div>
                  <div className="checkbox__container">
                    <input
                      className="amenities__checkbox"
                      type="checkbox"
                      name="parking"
                      id="parking"
                      checked={parkingChecked}
                      onChange={onParkingChange}
                    />
                    <label htmlFor="parking">Parking</label>
                  </div>
                  <div className="checkbox__container">
                    <input
                      className="amenities__checkbox"
                      type="checkbox"
                      name="breakfast"
                      id="breakfast"
                      checked={breakfastChecked}
                      onChange={onBreakfastChange}
                    />
                    <label htmlFor="breakfast">Breakfast</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter__footer">
            <button className="filter__modal__btn" onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
