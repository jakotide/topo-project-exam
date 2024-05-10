import "./FilterComponent.scss";
import FilterIcon from "../../../assets/icons/filter.png";
import CloseIcon from "../../../assets/icons/x.png";
import { useRef } from "react";

export const FilterComponent = () => {
  const dialogRef = useRef(null);

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    {
      dialogRef.current.hasAttribute("open")
        ? dialogRef.current.close()
        : dialogRef.current.showModal();
    }
  };
  return (
    <>
      <button onClick={toggleDialog} className="filter__btn">
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
            <button onClick={toggleDialog} className="modal__close__button">
              <img src={CloseIcon} alt="Close icon" />
            </button>
          </div>
          <div className="filter__modal__content">
            <div className="filter__modal__content__box">
              <div className="price__slider__box">
                <div className="modal__header">Price Range</div>
                <div>Select the minimum and maximum price</div>
                <input
                  type="range"
                  className="modal__price__slider"
                  aria-label="Price range slider"
                />
                <div className="price__box">
                  <div>10kr</div>
                  <div className="line">-</div>
                  <div>10000kr</div>
                </div>
              </div>
              <div className="rooms__box">
                <div className="modal__header">Number of rooms</div>
                <div className="rooms__btn__container">
                  <button
                    className="rooms__btn active"
                    aria-pressed="true"
                    type="button"
                  >
                    All
                  </button>
                  <button className="rooms__btn">1</button>
                  <button className="rooms__btn">2</button>
                  <button className="rooms__btn">3</button>
                  <button className="rooms__btn">4</button>
                  <button className="rooms__btn">5</button>
                  <button className="rooms__btn">6</button>
                  <button className="rooms__btn">7</button>
                  <button className="rooms__btn">8+</button>
                </div>
              </div>
              <div>
                <div>Amenities</div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Wifi</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Pets</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Parking</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Breakfast</label>
                </div>
              </div>
            </div>
          </div>
          <div className="filter__footer">Accept</div>
        </div>
      </dialog>
    </>
  );
};
