import "./createVenue.scss";
import React, { useState, useRef, useEffect } from "react";
import { postVenue } from "../../../api/postVenue";
import { useToken, useApiKey } from "../../../hooks/useStore";
import { useFetchApiKey } from "../../../hooks/useFetchApiKey";

export const CreateVenueModal = ({ onClose, onVenueCreated, apiKey }) => {
  const dialogRef = useRef(null);
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    rating: 5,
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
      lat: 0,
      lng: 0,
    },
  });

  const token = useToken();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setVenueData((prevData) => ({
        ...prevData,
        meta: { ...prevData.meta, [name]: checked },
      }));
    } else {
      const numericValue =
        name === "maxGuests" || name === "price" || name === "rating"
          ? parseFloat(value)
          : value;

      setVenueData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    }
  };

  const handleLocationChange = (field, value) => {
    setVenueData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  const handleMediaChange = (index, key, value) => {
    const updatedMedia = [...venueData.media];
    updatedMedia[index][key] = value;
    setVenueData((prevData) => ({
      ...prevData,
      media: updatedMedia,
    }));
  };

  const addMedia = () => {
    setVenueData((prevData) => ({
      ...prevData,
      media: [...prevData.media, { url: "", alt: "" }],
    }));
  };

  const removeMedia = (index) => {
    const updatedMedia = venueData.media.filter((_, i) => i !== index);
    setVenueData((prevData) => ({
      ...prevData,
      media: updatedMedia,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await postVenue(token, apiKey, venueData); // Use apiKey from props
      if (result) {
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
          <fieldset>
            <legend>Media</legend>
            {venueData.media.map((media, index) => (
              <div key={index} className="media-input">
                <label>
                  Media URL:
                  <input
                    id="media"
                    value={media.url}
                    onChange={(e) =>
                      handleMediaChange(index, "url", e.target.value)
                    }
                    className="create__modal__input"
                    // required={index === 0}
                  />
                </label>
                <label>
                  Media Description:
                  <input
                    value={media.alt}
                    onChange={(e) =>
                      handleMediaChange(index, "alt", e.target.value)
                    }
                    className="create__modal__input"
                  />
                </label>
                {index > 0 && (
                  <button type="button" onClick={() => removeMedia(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMedia}>
              Add Media
            </button>
          </fieldset>
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
            autoComplete="new-off"
            type="text"
            name="venue_address"
            value={venueData.location.address}
            onChange={(e) => handleLocationChange("address", e.target.value)}
            className="create__modal__input"
            required
          />
          <label className="create__modal__label">City:</label>
          <input
            autoComplete="new-off"
            type="venue_text"
            name="city"
            value={venueData.location.city}
            onChange={(e) => handleLocationChange("city", e.target.value)}
            className="create__modal__input"
            required
          />
          <label className="create__modal__label">Zip:</label>
          <input
            autoComplete="new-off"
            type="number"
            name="venue_zip"
            value={venueData.location.zip}
            onChange={(e) => handleLocationChange("zip", e.target.value)}
            className="create__modal__input"
          />
          <label className="create__modal__label">Country:</label>
          <input
            autoComplete="new-off"
            type="text"
            name="venue_country"
            value={venueData.location.country}
            onChange={(e) => handleLocationChange("country", e.target.value)}
            className="create__modal__input"
            required
          />
          <label className="create__modal__label">Continent:</label>
          <input
            autoComplete="new-password"
            type="text"
            name="venue_continent"
            value={venueData.location.continent}
            onChange={(e) => handleLocationChange("continent", e.target.value)}
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
