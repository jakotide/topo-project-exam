import { fetchApi } from "./api";

export const handleSubmit = async (e) => {
  e.preventDefault();
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  const url = "/holidaze/venues";
  const options = {
    method: "POST",
    body: JSON.stringify(venueData),
  };

  try {
    const result = await fetchApi(url, options, token);
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
