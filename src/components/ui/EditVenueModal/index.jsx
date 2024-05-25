import "./EditVenueModal.scss";
import React, { useState, useRef, useEffect } from "react";
import { editVenue } from "../../../api/editVenue";
import { useToken } from "../../../hooks/useStore";

export const EditVenueModal = ({ onClose, onVenueUpdated, apiKey, venue }) => {
  const dialogRef = useRef(null);
  const [venueData, setVenueData] = useState({
    name: venue.name,
    description: venue.description,
    media: venue.media,
    price: venue.price,
    maxGuests: venue.maxGuests,
    rating: venue.rating,
    meta: venue.meta,
    location: venue.location,
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
      const result = await editVenue(venue.id, token, apiKey, venueData);
      if (result) {
        onVenueUpdated(result.data);
        closeDialog();
      } else {
        console.error("Failed to update venue:", result);
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
    onClose();
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
      <button onClick={openDialog} className="edit__venue__btn">
        Edit
      </button>
      <dialog ref={dialogRef} className="create-venue-modal">
        <form onSubmit={handleSubmit} className="create__venue__form">
          <h2 className="create__modal__header">Edit Venue</h2>
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

          <legend>Media</legend>
          {venueData.media.map((media, index) => (
            <div key={index} className="media-input">
              <input
                id="media"
                value={media.url}
                placeholder="URL"
                aria-label="media-url"
                onChange={(e) =>
                  handleMediaChange(index, "url", e.target.value)
                }
                className="create__modal__input"
              />

              <input
                value={media.alt}
                aria-label="media-alt"
                placeholder="ALT"
                onChange={(e) =>
                  handleMediaChange(index, "alt", e.target.value)
                }
                className="create__modal__input"
              />

              {index > 0 && (
                <button
                  className="remove__media__btn"
                  type="button"
                  onClick={() => removeMedia(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button className="add__media__btn" type="button" onClick={addMedia}>
            Add Media
          </button>

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
              Save Changes
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
