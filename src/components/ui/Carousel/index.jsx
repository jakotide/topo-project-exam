import "./Carousel.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const Carousel = ({ children: slides }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((prevCurr) => (prevCurr === 0 ? slides.length - 1 : prevCurr - 1));
  };

  const next = () => {
    setCurr((prevCurr) => (prevCurr === slides.length - 1 ? 0 : prevCurr + 1));
  };

  const translateValue = -curr * 100;

  return (
    <div className="caro__container">
      <div
        className="carousel"
        style={{ transform: `translateX(${translateValue}%)` }}
      >
        {slides}
      </div>
      <div className="caro__btn__container">
        <FontAwesomeIcon
          className="carousel__arrow__right"
          icon={faChevronLeft}
          onClick={prev}
        />
        <FontAwesomeIcon
          className="carousel__arrow__right"
          icon={faChevronRight}
          onClick={next}
        />
      </div>
    </div>
  );
};
