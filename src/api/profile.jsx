import { PROFILES_URL } from "../constants/Endpoints";

export async function getProfile(token, apiKey, name) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  };
  console.log(apiKey);
  const response = await fetch(`${PROFILES_URL}/${name}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  return json;
}
