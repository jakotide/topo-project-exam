// src/components/CreateVenueModal/CreateVenueModal.js
import "./createVenue.scss";
import React, { useState, useRef, useEffect } from "react";

export const CreateVenueModal = ({ onClose, onVenueCreated }) => {
  const dialogRef = useRef(null);
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    rating: "",
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setVenueData((prevData) => ({
        ...prevData,
        meta: { ...prevData.meta, [name]: checked },
      }));
    } else {
      setVenueData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(venueData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        onVenueCreated(result.data);
        closeDialog();
      } else {
        console.error("Failed to create venue:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
    document.body.classList.add("modal-open");
  };

  const closeDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    document.body.classList.remove("modal-open");
    // onClose();
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
    <div>
      <button onClick={openDialog}>Create Venue</button>
      <dialog ref={dialogRef} className="create-venue-modal">
        <form onSubmit={handleSubmit} className="create__venue__form">
          <h2 className="create__modal__header">Create Venue</h2>
          <label className="create__modal__label">Name:</label>
          <input
            type="text"
            name="name"
            value={venueData.name}
            onChange={handleChange}
            required
            className="create__modal__input"
          />
          <label className="create__modal__label">Description:</label>
          <textarea
            name="description"
            value={venueData.description}
            onChange={handleChange}
            required
            className="create__modal__input"
          />
          <label className="create__modal__label">Price:</label>
          <input
            type="number"
            name="price"
            value={venueData.price}
            onChange={handleChange}
            required
            className="create__modal__input"
          />
          <label className="create__modal__label">Max Guests:</label>
          <input
            type="number"
            name="maxGuests"
            value={venueData.maxGuests}
            onChange={handleChange}
            required
            className="create__modal__input"
          />
          <label className="create__modal__label">Media:</label>
          <input
            type="text"
            placeholder="Media URL"
            name="media"
            value={venueData.media.url}
            onChange={handleChange}
            required
            className="create__modal__input"
          />
          <h3 className="create__modal__label">Amenities</h3>
          <div className="amenities__div">
            <label>
              Wifi:
              <input
                type="checkbox"
                name="wifi"
                checked={venueData.meta.wifi}
                onChange={handleChange}
              />
            </label>
            <label>
              Parking:
              <input
                type="checkbox"
                name="parking"
                checked={venueData.meta.parking}
                onChange={handleChange}
              />
            </label>
            <label>
              Breakfast:
              <input
                type="checkbox"
                name="breakfast"
                checked={venueData.meta.breakfast}
                onChange={handleChange}
              />
            </label>
            <label>
              Pets:
              <input
                type="checkbox"
                name="pets"
                checked={venueData.meta.pets}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="create__modal__label">Address:</label>
          <input
            type="text"
            name="address"
            value={venueData.location.address}
            onChange={handleChange}
            className="create__modal__input"
            required
          />
          <label className="create__modal__label">City:</label>
          <input
            type="text"
            name="city"
            value={venueData.location.city}
            onChange={handleChange}
            className="create__modal__input"
            required
          />
          <label className="create__modal__label">Zip:</label>
          <input
            type="number"
            name="zip"
            value={venueData.location.zip}
            onChange={handleChange}
            className="create__modal__input"
          />
          <label className="create__modal__label">Country:</label>
          <input
            type="text"
            name="country"
            value={venueData.location.country}
            onChange={handleChange}
            className="create__modal__input"
            required
          />
          <label className="create__modal__label">Continent:</label>
          <input
            type="text"
            name="continent"
            value={venueData.location.continent}
            onChange={handleChange}
            className="create__modal__input"
          />
          <div className="modal__btn__container">
            <button
              type="button"
              onClick={closeDialog}
              className="modal__cancel__btn"
            >
              Cancel
            </button>
            <button type="submit" className="modal__create__btn">
              Create Venue
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
