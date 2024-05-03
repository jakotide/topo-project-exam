import "./Carousel.scss";
import { useState } from "react";

export const Carousel = ({ children: slides }) => {
  const [curr, setCurr] = useState(0);
  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  return (
    <div>
      <div
        className="carousel"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div>
        <button onClick={prev}>left</button>
        <button onClick={next}>right</button>
      </div>
    </div>
  );
};
