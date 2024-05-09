import "./FilterComponent.scss";
import FilterIcon from "../../../assets/icons/filter.png";
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
      <dialog ref={dialogRef} aria-modal="true" className="filter__modal">
        Hello!
      </dialog>
    </>
  );
};
