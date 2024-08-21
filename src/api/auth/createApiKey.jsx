const API_BASE_V2 = "https://v2.api.noroff.dev";
const API_KEY_URL = `${API_BASE_V2}/auth/create-api-key`;

export async function createApiKey(accessToken, name = "API Key") {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  };

  const response = await fetch(API_KEY_URL, options);
  const json = await response.json();
  console.log("APIKEY:", json);

  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message ?? "There was an error creating the API key"
    );
  }

  // Return the key from the data object
  return json.data.key;
}
