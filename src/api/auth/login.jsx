import { LOGIN_URL } from "../../constants/Endpoints";

export async function loginUser(userDetails) {
  const { password, email } = userDetails;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  };

  const response = await fetch(LOGIN_URL, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  json.remember = userDetails.remember;
  return json;
}
