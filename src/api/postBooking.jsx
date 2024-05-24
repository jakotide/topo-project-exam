// api/postBooking.js

const API_BASE_V2 = "https://v2.api.noroff.dev/";

export const postBooking = async (bookingData, token, apiKey) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  };

  try {
    const response = await fetch(`${API_BASE_V2}holidaze/bookings`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message ?? "There was an error");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};
