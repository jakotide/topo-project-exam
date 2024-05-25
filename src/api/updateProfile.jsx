const PROFILES_URL = "https://v2.api.noroff.dev/holidaze/profiles";

export async function updateAvatar({ name, avatarUrl, token, apiKey }) {
  const url = `${PROFILES_URL}/${name}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({
      avatar: {
        url: avatarUrl,
        alt: `${name}'s avatar`,
      },
    }),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  return json;
}
