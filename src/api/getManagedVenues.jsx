const API_BASE_V2 = "https://v2.api.noroff.dev/";

export const getManagedVenues = async (token, apiKey, profileName) => {
  {
    token, apiKey, profileName;
  }
  try {
    const response = await fetch(
      `${API_BASE_V2}holidaze/profiles/${profileName}/venues`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch venues: ${response.statusText}`);
    }

    const data = await response.json();
    // Log the raw API response
    return data;
  } catch (error) {
    console.error("Error in getManagedVenues:", error); // Log any errors
    throw new Error(error.message);
  }
};
