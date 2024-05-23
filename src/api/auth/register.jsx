import { REGISTER_URL, REGISTER_URL_V2 } from "../../constants/Endpoints";

export async function registerUser(userDetails) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };

  const response = await fetch(REGISTER_URL_V2, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  return json;
}
