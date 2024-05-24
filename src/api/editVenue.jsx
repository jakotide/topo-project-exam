const API_BASE_V2 = "https://v2.api.noroff.dev/";

export const editVenue = async (id, token, apiKey, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${API_BASE_V2}holidaze/venues/${id}`, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message ?? "There was an error");
  }

  const json = await response.json();
  return json;
};
