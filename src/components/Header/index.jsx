import "./Header.scss";
import { useState } from "react";
import { Nav } from "./Nav";

export const Header = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header>
      <div>TOPO</div>
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <div className="burger"></div>
      </button>
      {isActive && <Nav />}
    </header>
  );
};
