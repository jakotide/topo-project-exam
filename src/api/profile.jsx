import { PROFILES_URL } from "../constants/Endpoints";

export async function getProfile(token, name) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Hello");
  const response = await fetch(`${PROFILES_URL}/${name}`, options);
  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  return json;
}
