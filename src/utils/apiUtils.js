const apiBaseUrl = "https://v2.api.noroff.dev";
const profileUrl = "https://v2.api.noroff.dev/holidaze/profiles";

export const fetchApi = async (url, options = {}, accessToken) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Check if accessToken is provided and add Authorization header if it exists
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  const response = await fetch(`${apiBaseUrl}${url}`, fetchOptions);
  if (response.status === 204) {
    return { data: null, error: null };
  }

  if (!response.ok) {
    const errorBody = await response.json();
    const errorMessage = errorBody.message || `Status code: ${response.status}`;
    throw new Error(`API request failed: ${errorMessage}`);
  }
  return response.json();
};
