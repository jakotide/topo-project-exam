export const createVenueApi = async (venueData) => {
  const user = localStorage.getItem("user");
  if (!user) {
    throw new Error("User is not logged in");
  }

  const { accessToken } = JSON.parse(user);

  try {
    const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error("Failed to create venue");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
