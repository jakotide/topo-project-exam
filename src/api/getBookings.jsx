const API_BASE_V2 = "https://v2.api.noroff.dev/holidaze";

export const getBookings = async (name, token, apiKey) => {
  try {
    const response = await fetch(
      `${API_BASE_V2}/profiles/${name}/bookings?_venue=true`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const responseData = await response.json();
    const bookings = responseData.data;

    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};
