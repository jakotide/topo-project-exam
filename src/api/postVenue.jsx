import { PROPERTIES_V2 } from "../constants/Endpoints";

export async function postVenue(token, apiKey, data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };
  console.log(PROPERTIES_V2);
  const response = await fetch(PROPERTIES_V2, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  return json;
}
