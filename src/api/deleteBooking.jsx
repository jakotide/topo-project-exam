const API_BASE_V2 = "https://v2.api.noroff.dev/";

export const deleteBooking = async (id, token, apiKey) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  const response = await fetch(
    `${API_BASE_V2}holidaze/bookings/${id}`,
    options
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message ?? "There was an error");
  }
};
